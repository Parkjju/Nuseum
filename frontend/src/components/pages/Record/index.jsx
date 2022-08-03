import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import morning from '../../../assets/morning.png';
import lunch from '../../../assets/lunch.png';
import dinner from '../../../assets/dinner.png';
import cake from '../../../assets/cake.png';
import drug from '../../../assets/drug.png';
import {
    DiaryBody,
    DiaryTitle,
    ImageBox,
    Img,
    Label,
    ModalBackground,
    ModalInput,
    ModalSearch,
    Remove,
    Tag,
    TagBox,
} from './styled';
import { Icon, Name } from '../../atom/Card/styled';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { Modal, ModalBtn, ModalTitle } from '../../atom/Modal/styled';

function Record() {
    const [selectedImage, setSelectedImage] = useState([]);
    const [foodName, setFoodName] = useState();
    const [foodAmount, setFoodAmount] = useState();
    const [foodInformation, setFoodInformation] = useState([]);
    const param = useParams();

    let menu = [];
    const onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage((prev) => [...prev, e.target.files[0]]);
        }
    };
    const [open, setOpen] = useState(false);

    const removeSelectedImage = (index) => {
        setSelectedImage((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
        ]);
    };

    switch (param.when) {
        case 'morning':
            menu.push([morning, '아침', 'morning']);
            break;
        case 'lunch':
            menu.push([lunch, '점심', 'lunch']);
            break;
        case 'dinner':
            menu.push([dinner, '저녁', 'dinner']);
            break;
        case 'cake':
            menu.push([cake, '간식', 'cake']);
            break;
        case 'drug':
            menu.push([drug, '영양제', 'drug']);
            break;
        default:
            break;
    }

    const onChangeName = (e) => {
        setFoodName(e.target.value);
    };
    const onChangeAmount = (e) => {
        setFoodAmount(e.target.value);
    };
    const navigate = useNavigate();
    useEffect(() => {
        const sessionStorage = window.sessionStorage;
        if (!sessionStorage.getItem('access_token')) {
            navigate('/login');
        }
    }, []);
    return (
        <Container>
            <Contents>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Icon style={{ width: '40px' }} src={menu[0][0]} />
                    <Name>{menu[0][1]}</Name>
                </DiaryTitle>
                <Name style={{ marginBottom: '50px' }}>
                    업로드한 이미지를 클릭하여 식이정보를 입력하세요 :)
                </Name>
                <DiaryBody
                    initial={{ y: 300 }}
                    animate={{ y: 0 }}
                    exit={{ y: -300 }}
                    transition={{
                        velocity: 1,
                    }}
                >
                    <Label style={{ marginBottom: 30 }} htmlFor='input-file'>
                        업로드
                    </Label>
                    <input
                        onChange={onChange}
                        type='file'
                        id='input-file'
                        style={{ display: 'none' }}
                    />

                    {selectedImage && (
                        <ImageBox>
                            {selectedImage.map((item, index) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                        velocity: 1,
                                    }}
                                    style={{
                                        width: '80%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        alignContent: 'space-between',
                                    }}
                                    key={item.name}
                                >
                                    <Remove
                                        onClick={() => {
                                            return removeSelectedImage(index);
                                        }}
                                    >
                                        <span className='material-symbols-outlined'>
                                            close
                                        </span>
                                    </Remove>
                                    <Img
                                        onClick={() => setOpen(true)}
                                        src={URL.createObjectURL(item)}
                                        alt='img'
                                    />
                                </motion.div>
                            ))}
                        </ImageBox>
                    )}
                    <TagBox>
                        {foodInformation.map((item) => (
                            <Tag>
                                {item[0]} {` ${item[1]}g`}
                            </Tag>
                        ))}
                    </TagBox>
                </DiaryBody>
            </Contents>
            {open ? (
                <ModalBackground>
                    <Modal
                        as='form'
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '250px',
                        }}
                    >
                        <div
                            style={{
                                height: '120px',
                                paddingTop: '30px',
                            }}
                        >
                            <ModalTitle>음식 명을 검색하세요.</ModalTitle>
                            <ModalSearch>
                                <span className='material-symbols-outlined'>
                                    search
                                </span>
                                <ModalInput
                                    value={foodName}
                                    onChange={onChangeName}
                                />
                            </ModalSearch>
                        </div>
                        <div style={{ height: '120px' }}>
                            <ModalTitle>
                                먹은 양을 입력해주세요. (단위: g)
                            </ModalTitle>
                            <ModalSearch>
                                <ModalInput
                                    type='number'
                                    value={foodAmount}
                                    onChange={onChangeAmount}
                                />
                                <span
                                    style={{
                                        fontSize: '16px',
                                    }}
                                >
                                    g
                                </span>
                            </ModalSearch>
                        </div>
                        <ModalBtn
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                setFoodAmount(0);
                                setFoodName('');
                                setFoodInformation((prev) => [
                                    ...prev,
                                    [foodName, foodAmount],
                                ]);
                                return setOpen(false);
                            }}
                            open={open}
                        >
                            저장
                        </ModalBtn>
                    </Modal>
                </ModalBackground>
            ) : null}
        </Container>
    );
}

export default Record;
