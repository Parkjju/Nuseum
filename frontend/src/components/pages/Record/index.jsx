import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { useParams } from 'react-router-dom';

import morning from '../../../assets/morning.png';
import mid from '../../../assets/lunch.png';
import night from '../../../assets/dinner.png';
import cake from '../../../assets/cake.png';
import drug from '../../../assets/drug.png';
import {
    DiaryBody,
    DiaryTitle,
    ImageBox,
    Img,
    Label,
    ModalInput,
    ModalSearch,
    Remove,
    Result,
    ResultBox,
    Tag,
    TagBox,
} from './styled';
import { Icon, Name } from '../../atom/Card/styled';
import { useState } from 'react';

import { motion } from 'framer-motion';
import { ModalTitle } from '../../atom/Modal/styled';
import { periodState } from '../../../recoil/period/period';
import { useRecoilState } from 'recoil';
import axios from 'axios';

function Record() {
    // 식사 시간별 데이터 전역상태
    const [meal, setMeal] = useRecoilState(periodState);

    // 선택 이미지 상태값 - 삭제할때 활용
    const [selectedImage, setSelectedImage] = useState([]);

    // 검색 음식명
    const [foodName, setFoodName] = useState();

    // 입력 음식 양
    const [foodAmount, setFoodAmount] = useState();

    // 음식 태그
    const [foodTag, setFoodTag] = useState([]);

    // 검색결과 배열
    const [result, setResult] = useState(null);
    const param = useParams();

    let menu = [];
    const onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage((prev) => [...prev, e.target.files[0]]);
        }
    };
    const onClick = () => {
        setMeal((prev) => {
            let copy = [...prev];
            copy[index] = [...foodTag];
            return [...copy];
        });
    };

    const removeSelectedImage = (index) => {
        setSelectedImage((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
        ]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const sessionStorage = window.sessionStorage;
        await axios
            .get(
                `https://cryptic-castle-40575.herokuapp.com/api/v1/foods/?search=${foodName}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then((response) => {
                console.log(response.data);
                setResult(response.data.results);
                // 검색결과가 response로 나옴
                // 각각 음식결과를 푸드태그 상태값에 저장
                // 논리적으로 임시방편 , 데이터 확인을 위한 저장임
                // 순회하며 하나씩 푸드태그에 [음식명, 그램] 저장한 뒤 리턴
                // 그램은 10그램으로 일단 고정

                setFoodTag((prev) => {
                    const copy = [...prev];
                    let newFood = [];
                    response.data.results.forEach((food) => {
                        newFood.push([food.id, 10]);
                    });
                    return [...copy, ...newFood];
                });
            });
        setFoodAmount(0);
        setFoodName('');
    };

    let index = param.when;
    switch (param.when) {
        case 'breakfast':
            menu.push([morning, '아침', 'breakfast']);

            break;
        case 'lunch':
            menu.push([mid, '점심', 'lunch']);

            break;
        case 'dinner':
            menu.push([night, '저녁', 'dinner']);

            break;
        case 'snack':
            menu.push([cake, '간식', 'snack']);

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

    return (
        <Container>
            <Contents>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Icon style={{ width: '40px' }} src={menu[0][0]} />
                    <Name>{menu[0][1]}</Name>
                </DiaryTitle>
                <Name style={{ marginBottom: '5px' }}>
                    음식 이미지를 업로드하고
                </Name>
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
                        +
                    </Label>
                    <input
                        onChange={onChange}
                        type='file'
                        id='input-file'
                        style={{ display: 'none' }}
                    />
                    <ModalTitle>음식 명을 검색하세요.</ModalTitle>
                    <ModalSearch as='form' onSubmit={onSubmit}>
                        <span className='material-symbols-outlined'>
                            search
                        </span>
                        <ModalInput value={foodName} onChange={onChangeName} />
                    </ModalSearch>
                    {/* <ModalBtn
                        style={{
                            cursor: 'pointer',
                            marginBottom: '20px',
                            backgroundColor: 'transparent',
                        }}
                    >
                        검색
                    </ModalBtn> */}
                    <ResultBox>
                        {result
                            ? result.map((item, index) => (
                                  <Result key={item.id}>{item.name}</Result>
                              ))
                            : null}
                    </ResultBox>

                    {selectedImage && (
                        <ImageBox>
                            {selectedImage.map((item, index) => (
                                <motion.div
                                    key={index}
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
                                        src={URL.createObjectURL(item)}
                                        alt='img'
                                    />
                                </motion.div>
                            ))}
                        </ImageBox>
                    )}
                    <TagBox>
                        {foodTag
                            ? foodTag.map((item, index) => (
                                  <Tag key={index}>
                                      {item[0]}
                                      {` ${item[1]}g`}
                                  </Tag>
                              ))
                            : null}
                    </TagBox>
                    <button onClick={onClick}>저장</button>
                </DiaryBody>
            </Contents>
        </Container>
    );
}

export default Record;
