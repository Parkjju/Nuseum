import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { useNavigate, useParams } from 'react-router-dom';

import morning from '../../../assets/morning.png';
import mid from '../../../assets/lunch.png';
import night from '../../../assets/dinner.png';
import cake from '../../../assets/cake.png';
import drug from '../../../assets/drug.png';
import water from '../../../assets/water.png';

import {
    DiaryBody,
    DiaryTitle,
    Label,
    ModalInput,
    ModalSearch,
    Tag,
    TagBox,
} from './styled';
import { Icon, Name } from '../../atom/Card/styled';
import { useEffect, useState } from 'react';
import { ModalTitle } from '../../atom/Modal/styled';
import { mealImageState, periodState } from '../../../recoil/period/period';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import Menu from '../../atom/Menu';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import imageCompression from 'browser-image-compression';
import { postIdState } from '../../../recoil/postID/postId';
import FoodImg from '../../molecules/FoodImg/FoodImg';
import ImageBox from './ImageBox';
import ImageCard from '../../molecules/ImageCard';
import { supplementState } from '../../../recoil/supplement/supplement';
import Water from '../Water';

function Record() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [supplement, setSupplement] = useRecoilState(supplementState);

    const param = useParams();
    // 식사 시간별 데이터 전역상태
    const [meal, setMeal] = useRecoilState(periodState);

    // postId 얻어서 PUT / POST 구분
    const [postId, setPostId] = useRecoilState(postIdState);

    // 선택 이미지 상태값 - 삭제할때 활용
    const [globalImage, setGlobalImage] = useRecoilState(mealImageState);

    // 검색 음식명
    const [foodName, setFoodName] = useState();

    // 음식 태그
    const [foodTag, setFoodTag] = useState([]);

    // 검색결과 배열
    const [result, setResult] = useState(null);

    // 로딩 인디케이터
    const [isLoading, setIsLoading] = useState(false);

    // 영양제 이미지 추가 버튼함수
    const addImageCard = () => {
        setSupplement((prev) => [
            ...prev,
            { name: '', manufacturer: '', image: '' },
        ]);
    };

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

                setGlobalImage((prev) => {
                    return {
                        ...prev,
                        [param.when]: [...prev[param.when], base64data],
                    };
                });
            };
        } catch (error) {
            console.log(error);
        }
    };
    console.log(globalImage);

    // globalImage들 끼니별로 분류하여 불러오고 있음.
    useEffect(() => {
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

    const onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
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
        case 'water':
            menu.push([water, '물', 'water']);
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
            setLoading(true);
            axios
                .post(
                    'https://cryptic-castle-40575.herokuapp.com/api/v1/post/',
                    {
                        meal: { ...copy },
                        created_at: Number(param.date),
                        water: 0,
                        supplement: [...supplement],
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
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    alert('오류가 발생했습니다. 개발자에게 문의해주세요 😭');
                    setLoading(false);
                });
        } else {
            setLoading(true);
            axios
                .put(
                    `https://cryptic-castle-40575.herokuapp.com/api/v1/post/${postId}/`,
                    {
                        meal: { ...copy },
                        water: 0,
                        supplement: [...supplement],
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
                    console.log(response.data);
                    alert('일기 수정이 완료되었어요☺️');
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                    alert('오류가 발생했습니다. 개발자에게 문의해주세요 😭');
                });
        }
    };

    const onClickTag = (index) => {
        let left = [...foodTag.slice(0, index)];
        let right = [...foodTag.slice(index + 1)];
        setMeal((prev) => {
            return {
                ...prev,
                [param.when]: {
                    data: [...left, {}, ...right],
                    image: [...prev[param.when].image],
                },
            };
        });
    };

    const removeImageCard = (index) => {
        setSupplement((prev) => {
            const left = prev.slice(0, index);
            const right = prev.slice(index + 1);

            return [...left, {}, ...right];
        });
    };

    return (
        <Container>
            <Contents>
                <DiaryTitle layoutId={menu[0][2]}>
                    <Icon style={{ width: '40px' }} src={menu[0][0]} />
                    <Name>{menu[0][1]}</Name>
                </DiaryTitle>
                <Name style={{ marginBottom: '5px' }}>
                    {param.when === 'supplement'
                        ? '오늘 섭취한 영양제를 기록해주세요 :)'
                        : param.when === 'water'
                        ? '오늘 섭취한 물을 기록해주세요 :)'
                        : '음식 이미지를 업로드하고 식이정보를 입력하세요 :)'}
                </Name>
                <Name style={{ marginBottom: '50px' }}>
                    {/* 식이정보를 입력하세요 :) */}
                </Name>
                {param.when === 'supplement' ? (
                    <>
                        <button
                            onClick={addImageCard}
                            style={{ marginBottom: 20 }}
                        >
                            추가하기
                        </button>
                        {supplement.map((item, index) =>
                            Object.keys(item).length === 0 ? null : (
                                <ImageCard
                                    index={index}
                                    removeImageCard={() =>
                                        removeImageCard(index)
                                    }
                                    key={item.id}
                                    data={item}
                                />
                            )
                        )}

                        <button
                            style={{ marginBottom: 30 }}
                            onClick={onClickLast}
                        >
                            저장
                        </button>
                    </>
                ) : param.when === 'water' ? (
                    <Water />
                ) : (
                    <DiaryBody
                        initial={{ y: 300 }}
                        animate={{ y: 0 }}
                        exit={{ y: -300 }}
                        transition={{
                            velocity: 1,
                        }}
                    >
                        <Label
                            style={{ marginBottom: 30 }}
                            htmlFor='input-file'
                        >
                            +
                        </Label>

                        {globalImage[param.when] && (
                            <ImageBox>
                                {globalImage[param.when].map((item, index) =>
                                    item === '' ? null : (
                                        <FoodImg
                                            data={item}
                                            removeFunction={removeSelectedImage}
                                            index={index}
                                            key={index}
                                        />
                                    )
                                )}
                            </ImageBox>
                        )}
                        <TagBox>
                            {foodTag
                                ? foodTag.map((item, index) =>
                                      Object.entries(item).length !== 0 ? (
                                          <Tag
                                              onClick={() => onClickTag(index)}
                                              key={index}
                                          >
                                              {item.name}
                                              {` ${item.amount} (g 또는 ml)`}
                                          </Tag>
                                      ) : null
                                  )
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
                            찾고싶은 음식을 작성한 후 엔터해주세요. 섭취량을
                            작성한 후 엔터해주세요.
                        </ModalTitle>
                        <ModalSearch as='form' onSubmit={onSubmit}>
                            <span className='material-symbols-outlined'>
                                search
                            </span>
                            <ModalInput
                                value={foodName}
                                onChange={onChangeName}
                            />
                        </ModalSearch>

                        {loading ? (
                            <CircularProgress sx={{ marginBottom: 5 }} />
                        ) : (
                            <button
                                onClick={onClickLast}
                                style={{ marginBottom: '30px' }}
                            >
                                저장
                            </button>
                        )}

                        {isLoading ? (
                            <CircularProgress sx={{ marginBottom: 5 }} />
                        ) : (
                            <Menu data={result} />
                        )}
                    </DiaryBody>
                )}
            </Contents>
        </Container>
    );
}

export default Record;
