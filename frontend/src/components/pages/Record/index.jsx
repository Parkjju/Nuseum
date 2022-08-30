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
import { useCallback, useEffect, useState } from 'react';

import { motion } from 'framer-motion';
import { ModalTitle } from '../../atom/Modal/styled';
import { mealImageState, periodState } from '../../../recoil/period/period';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import Menu from '../../atom/Menu';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import imageCompression from 'browser-image-compression';
import { postIdState } from '../../../recoil/postID/postId';

function Record() {
    const navigate = useNavigate();
    const param = useParams();
    // 식사 시간별 데이터 전역상태
    const meal = useRecoilValue(periodState);

    // postId 얻어서 PUT / POST 구분
    const [postId, setPostId] = useRecoilState(postIdState);

    // 선택 이미지 상태값 - 삭제할때 활용
    const [formData, setFormData] = useState([]);
    const [globalImage, setGlobalImage] = useRecoilState(mealImageState);
    const [selectedImage, setSelectedImage] = useState([]);

    // 검색 음식명
    const [foodName, setFoodName] = useState();

    // 음식 태그
    const [foodTag, setFoodTag] = useState([]);

    // 검색결과 배열
    const [result, setResult] = useState(null);

    // 로딩 인디케이터
    const [isLoading, setIsLoading] = useState(false);

    const actionImgCompress = async (fileSrc) => {
        const options = {
            maxSizeMB: 3,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };
        try {
            // 압축 결과
            const compressedFile = await imageCompression(fileSrc, options);

            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
                const base64data = reader.result;
                setFormData((prev) => [...prev, base64data]);
            };
        } catch (error) {
            console.log(error);
        }
    };

    // globalImage들 끼니별로 분류하여 불러오고 있음.
    useEffect(() => {
        setSelectedImage([...meal[param.when].image]);
        setFoodTag([]);
        setFoodTag((prev) => {
            const copy = [...prev];
            let newFood = [];

            switch (param.when) {
                case 'breakfast':
                    newFood = [...meal.breakfast.data];
                    break;
                case 'lunch':
                    newFood = [...meal.lunch.data];
                    break;
                case 'dinner':
                    newFood = [...meal.dinner.data];
                    break;
                case 'snack':
                    newFood = [...meal.snack.data];
                    break;
                case 'supplement':
                    newFood = [...meal.supplement.data];
                    break;
                default:
                    break;
            }

            return [...copy, ...newFood];
        });
    }, [param.when, meal]);

    let menu = [];

    // formData 생성 후에 함수가 호출된다. 비동기 처리의 완료
    useEffect(() => {
        // formData 생성 되고나서 삽입
        setGlobalImageAfterSelected();
    }, [formData]);

    useEffect(() => {
        // selectedImage 변경에 따라 글로벌이미지 세팅
        setGlobalImage((prev) => {
            return {
                ...prev,
                [param.when]: [...selectedImage],
            };
        });
    }, [selectedImage, param.when, setGlobalImage]);

    const setGlobalImageAfterSelected = useCallback(() => {
        let copy = [];
        for (let i of selectedImage) {
            if (typeof i === 'object') {
                continue;
            } else {
                copy.push(i);
            }
        }

        setGlobalImage((prev) => {
            return {
                ...prev,
                [param.when]: [...copy, ...formData],
            };
        });
    }, [selectedImage, formData, param.when, setGlobalImage]);

    const onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage((prev) => [...prev, e.target.files[0]]);
            actionImgCompress(e.target.files[0]);
        }
    };

    const removeSelectedImage = (index) => {
        setGlobalImage((prev) => {
            let copy = [...prev[param.when]];
            let left = [...copy.slice(0, index)];
            let right = [...copy.slice(index + 1)];
            return {
                ...prev,
                [param.when]: [...left, '', ...right],
            };
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const sessionStorage = window.sessionStorage;
        setIsLoading(true);
        await axios
            .get(
                `https://cryptic-castle-40575.herokuapp.com/api/v1/food/?search=${foodName}`,
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

    const deleteFoodName = (postData) => {
        for (let i of Object.keys(postData)) {
            if (postData[i].data.length === 0) {
                continue;
            }
            postData[i].image = globalImage[i];

            postData[i].data = postData[i].data.map((meal) => {
                let copy = { ...meal };
                delete copy.name;
                return { ...copy };
            });
        }
        return { ...postData };
    };

    const onClickLast = () => {
        let copy = {
            breakfast: {
                data: [...meal.breakfast.data],
                image: meal.breakfast.image,
            },
            lunch: {
                data: [...meal.lunch.data],
                image: meal.lunch.image,
            },
            dinner: {
                data: [...meal.dinner.data],
                image: meal.dinner.image,
            },
            snack: {
                data: [...meal.snack.data],
                image: meal.snack.image,
            },
        };
        copy = deleteFoodName(copy);

        if (postId === null || postId === undefined) {
            axios
                .post(
                    'https://cryptic-castle-40575.herokuapp.com/api/v1/post/',
                    {
                        meal: { ...copy },
                        created_at: Number(param.date),
                        water: 0,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .then((response) => {
                    alert('일지 등록이 완료되었어요☺️');
                    setPostId(() => {
                        return {
                            id: response.data.id,
                        };
                    });
                })
                .catch((err) => console.log(err));
        } else {
            axios
                .put(
                    `https://cryptic-castle-40575.herokuapp.com/api/v1/post/${postId}/`,
                    {
                        meal: { ...copy },
                        water: 0,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${sessionStorage.getItem(
                                'access_token'
                            )}`,
                        },
                    }
                )
                .then((response) => alert('일지 수정이 완료되었어요☺️'))
                .catch((err) => {
                    console.log(err);
                });
        }
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
                            {globalImage[param.when].map((item, index) =>
                                item === '' ? null : (
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
                                        {item === '' ? null : (
                                            <Remove
                                                onClick={() => {
                                                    return removeSelectedImage(
                                                        index
                                                    );
                                                }}
                                            >
                                                <span className='material-symbols-outlined'>
                                                    close
                                                </span>
                                            </Remove>
                                        )}
                                        <div
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                height: 'auto',
                                            }}
                                        >
                                            {typeof item === 'object' ? (
                                                <Img
                                                    src={URL.createObjectURL(
                                                        item
                                                    )}
                                                    alt='img'
                                                    style={{ width: '200px' }}
                                                />
                                            ) : typeof item === 'string' &&
                                              item.length > 1 ? (
                                                <Img
                                                    src={
                                                        typeof item === 'object'
                                                            ? URL.createObjectURL(
                                                                  item
                                                              )
                                                            : item
                                                    }
                                                    alt='img'
                                                    style={{ width: '200px' }}
                                                />
                                            ) : null}
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </ImageBox>
                    )}
                    <TagBox>
                        {foodTag
                            ? foodTag.map((item, index) => (
                                  <Tag key={index}>
                                      {item.name}
                                      {` ${item.amount} (g 또는 ml)`}
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

                    <button
                        onClick={onClickLast}
                        style={{ marginBottom: '30px' }}
                    >
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
