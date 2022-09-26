import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { useNavigate, useParams } from 'react-router-dom';

import morning from '../../../assets/morning.png';
import mid from '../../../assets/lunch.png';
import night from '../../../assets/dinner.png';
import cake from '../../../assets/cake.png';
import drug from '../../../assets/drug.png';
import water from '../../../assets/water.png';
import today from '../../../assets/today.png';

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
import { SearchTitle } from '../../atom/Modal/styled';
import { mealImageState, periodState } from '../../../recoil/period/period';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import Menu from '../../atom/Menu';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import imageCompression from 'browser-image-compression';
import { postIdState } from '../../../recoil/postID/postId';
import FoodImg from '../../molecules/FoodImg/FoodImg';
import ImageCard from '../../molecules/ImageCard';
import { supplementState } from '../../../recoil/supplement/supplement';
import Water from '../Water';
import { waterState } from '../../../recoil/water/water';
import Today from '../Today';
import { VerticalImageBox } from '../Today/Today.style';
import { useDispatch, useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import { useCallback } from 'react';

function Record() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [supplement, setSupplement] = useRecoilState(supplementState);

    const param = useParams();

    // 음식 데이터, 이미지 슬라이싱
    const data = useSelector((state) => state[param.when].data);
    const image = useSelector((state) => state[param.when].image);

    // 처음 실행되는지 여부
    const isInit = useSelector((state) => state[param.when].isInitial);

    // 디스패치 훅 임포트
    const dispatch = useDispatch();

    // 액션 훅 호출
    const action = useActions(param.when);

    // 검색 음식명
    const [foodName, setFoodName] = useState();

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
                dispatch(action.getImage(base64data));
            };
        } catch (error) {
            console.log(error);
        }
    };

    let menu = [];

    const onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            actionImgCompress(e.target.files[0]);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const sessionStorage = window.sessionStorage;
        setIsLoading(true);
        await axios
            .get(
                `https://nuseum-v2.herokuapp.com/api/v1/food/?search=${foodName}`,
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
            break;
        case 'today':
            menu.push([today, '오늘', 'today']);
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
                {/* param.when url에 따라 분기하는 장소 */}
                <Name style={{ marginBottom: '5px' }}>
                    {param.when === 'supplement'
                        ? '오늘 섭취한 영양제를 기록해주세요 :)'
                        : param.when === 'water'
                        ? '오늘 섭취한 물을 기록해주세요 :)'
                        : param.when === 'today'
                        ? '오늘 섭취한 음식정보를 요약합니다.'
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

                        {supplement.length === 0
                            ? null
                            : supplement.map((item, index) =>
                                  Object.keys(item).length === 0 ? null : (
                                      <ImageCard
                                          index={index}
                                          key={item.id}
                                          data={item}
                                      />
                                  )
                              )}

                        {loading ? (
                            <CircularProgress sx={{ marginBottom: 5 }} />
                        ) : (
                            <button
                                onClick={savePost}
                                style={{ marginBottom: '30px' }}
                            >
                                저장
                            </button>
                        )}
                    </>
                ) : // URL에 따라 분기하는 장소
                param.when === 'water' ? (
                    <Water />
                ) : param.when === 'today' ? (
                    <Today date={param.date} />
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

                        <VerticalImageBox style={{ width: '100%' }}>
                            {image.map((item, index) => (
                                <FoodImg
                                    data={item}
                                    index={index}
                                    key={item.id}
                                />
                            ))}
                        </VerticalImageBox>

                        <TagBox>
                            {data
                                ? data.map((item, index) =>
                                      Object.entries(item).length !== 0 ? (
                                          <Tag
                                              onClick={() =>
                                                  dispatch(
                                                      action.removeData(item.id)
                                                  )
                                              }
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

                        <SearchTitle>
                            찾고싶은 음식을 작성한 후 엔터해주세요. 섭취량을
                            작성한 후 엔터해주세요. 찾고 싶은 음식이 없다면 가장
                            유사한 것으로 선택해주세요. 관련된 내용을 Q&A에
                            적어주세요.
                        </SearchTitle>
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
                            <button style={{ marginBottom: '30px' }}>
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
