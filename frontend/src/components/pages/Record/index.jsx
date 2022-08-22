import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { useNavigate, useParams } from 'react-router-dom';

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
    Tag,
    TagBox,
} from './styled';
import { Icon, Name } from '../../atom/Card/styled';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { ModalTitle } from '../../atom/Modal/styled';
import { mealImageState, periodState } from '../../../recoil/period/period';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import Menu from '../../atom/Menu';
import CircularProgress from '@mui/material/CircularProgress';

function Record() {
    const navigate = useNavigate();
    // 식사 시간별 데이터 전역상태
    const [meal, setMeal] = useRecoilState(periodState);

    // 선택 이미지 상태값 - 삭제할때 활용
    const [selectedImage, setSelectedImage] = useState([]);
    const [formData, setFormData] = useState(new FormData());
    const [globalImage, setGlobalImage] = useRecoilState(mealImageState);

    // 검색 음식명
    const [foodName, setFoodName] = useState();

    // 입력 음식 양
    const [foodAmount, setFoodAmount] = useState();

    // 음식 태그
    const [foodTag, setFoodTag] = useState([]);

    // 검색결과 배열
    const [result, setResult] = useState(null);

    // 로딩 인디케이터
    const [isLoading, setIsLoading] = useState(false);

    const param = useParams();

    useEffect(() => {
        setFoodTag([]);
        setFoodTag((prev) => {
            const copy = [...prev];
            let newFood = [];
            switch (param.when) {
                case 'breakfast':
                    newFood = [...meal.breakfast];
                    break;
                case 'lunch':
                    newFood = [...meal.lunch];
                    break;
                case 'dinner':
                    newFood = [...meal.dinner];
                    break;
                case 'snack':
                    newFood = [...meal.snack];
                    break;
                case 'supplement':
                    newFood = [...meal.supplement];
                    break;
                default:
                    break;
            }

            return [...copy, ...newFood];
        });
    }, [param.when, meal]);

    let menu = [];
    const onChange = (e) => {
        if (selectedImage.length >= 3) {
            alert('사진은 세장까지만 등록 가능해요 😭');
            return;
        }
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage((prev) => [...prev, e.target.files[0]]);
            setFormData((prev) => {
                return {
                    ...prev,
                    [`${e.target.files[0].name}`]: e.target.files[0],
                };
            });
        }
    };

    const onClick = () => {
        switch (param.when) {
            case 'breakfast':
                for (let i = 1; i < selectedImage.length + 1; i++) {
                    setGlobalImage((prev) => {
                        return {
                            ...prev,
                            [`breakfast_img${i}`]:
                                formData[Object.keys(formData)[i - 1]],
                        };
                    });
                }
                break;
            case 'lunch':
                for (let i = 1; i < selectedImage.length + 1; i++) {
                    setGlobalImage((prev) => {
                        return {
                            ...prev,
                            [`lunch_img${i}`]:
                                formData[Object.keys(formData)[i - 1]],
                        };
                    });
                }
                break;
            case 'dinner':
                for (let i = 1; i < selectedImage.length + 1; i++) {
                    setGlobalImage((prev) => {
                        return {
                            ...prev,
                            [`dinner_img${i}`]:
                                formData[Object.keys(formData)[i - 1]],
                        };
                    });
                }
                break;
            case 'snack':
                for (let i = 1; i < selectedImage.length + 1; i++) {
                    setGlobalImage((prev) => {
                        return {
                            ...prev,
                            [`snack_img${i}`]:
                                formData[Object.keys(formData)[i - 1]],
                        };
                    });
                }
                break;
            case 'supplement':
                for (let i = 1; i < selectedImage.length + 1; i++) {
                    setGlobalImage((prev) => {
                        return {
                            ...prev,
                            [`supplement_img${i}`]:
                                formData[Object.keys(formData)[i - 1]],
                        };
                    });
                }
                break;
            default:
                break;
        }
        alert('저장되었습니다!');
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
        setIsLoading(true);
        await axios
            .get(
                `https://nuseum-server.herokuapp.com/api/v1/food/?search=${foodName}`,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem(
                            'access_token'
                        )}`,
                    },
                }
            )
            .then((response) => {
                if (response.data.results.length === 0) {
                    alert('검색 결과가 없어요!');
                } else {
                    setResult(response.data.results);
                }
            })
            .catch((e) => {
                if (e.response.data.code === 'token_not_valid') {
                    alert('세션이 만료되었습니다. 다시 로그인 해주세요!');
                    const sessionStorage = window.sessionStorage;
                    sessionStorage.clear();
                    navigate('/login');
                }
            });
        setFoodAmount(0);
        setFoodName('');
        setIsLoading(false);
    };

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
        case 'supplement':
            menu.push([drug, '영양제', 'supplement']);
            break;
        default:
            break;
    }

    const onChangeName = (e) => {
        setFoodName(e.target.value);
    };

    return (
        <Container>
            <Contents>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Icon style={{ width: '40px' }} src={menu[0][0]} />
                    <Name>{menu[0][1]}</Name>
                </DiaryTitle>
                <Name style={{ marginBottom: '5px' }}>
                    음식 이미지를 업로드하고 식이정보를 입력하세요 :)
                </Name>
                <Name style={{ marginBottom: '50px' }}>
                    {/* 식이정보를 입력하세요 :) */}
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
                                        width: '90%',
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
                                    <div
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            height: 'auto',
                                        }}
                                    >
                                        <Img
                                            src={URL.createObjectURL(item)}
                                            alt='img'
                                            style={{ width: '200px' }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </ImageBox>
                    )}
                    <TagBox>
                        {foodTag
                            ? foodTag.map((item, index) => (
                                  <Tag key={index}>
                                      {item[0]}
                                      {` ${item[2]} (g 또는 ml)`}
                                  </Tag>
                              ))
                            : null}
                    </TagBox>
                    <input
                        onChange={onChange}
                        type='file'
                        id='input-file'
                        style={{ display: 'none' }}
                        accept='image/*'
                    />
                    <ModalTitle>
                        찾고싶은 음식을 작성한 후 엔터해주세요. 섭취량을 작성한
                        후 엔터해주세요.
                    </ModalTitle>
                    <ModalSearch as='form' onSubmit={onSubmit}>
                        <span className='material-symbols-outlined'>
                            search
                        </span>
                        <ModalInput value={foodName} onChange={onChangeName} />
                    </ModalSearch>

                    <button onClick={onClick} style={{ marginBottom: '30px' }}>
                        저장
                    </button>
                    {isLoading ? (
                        <CircularProgress sx={{ marginBottom: 5 }} />
                    ) : (
                        <Menu data={result} />
                    )}
                </DiaryBody>
            </Contents>
        </Container>
    );
}

export default Record;
