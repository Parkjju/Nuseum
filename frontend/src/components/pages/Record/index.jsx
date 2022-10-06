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
import jwt_decode from 'jwt-decode';

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
import axios from 'axios';
import Menu from '../../atom/Menu';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import imageCompression from 'browser-image-compression';
import FoodImg from '../../molecules/FoodImg/FoodImg';
import Water from '../Water';
import Today from '../Today';
import { VerticalImageBox } from '../Today/Today.style';
import { useDispatch, useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import { postActions } from '../../../store/meal-slice/post-slice';
import { authActions } from '../../../store/auth-slice';
import Supplement from '../Supplement';
import { handleExpired } from '../../../helpers/handleExpired';

function Record() {
    const param = useParams();
    const token = useSelector((state) => state.auth.token);

    // useEffect로 받아온 데이터가 비어있다면
    const [isEmpty, setIsEmpty] = useState(false);

    // 액션 훅 호출
    const action = useActions(param.when);

    // 디스패치 훅 임포트
    const dispatch = useDispatch();

    // useEffect가 두번 실행됨
    const fetchData = () => {
        axios
            .get(
                `/api/v1/consumption/food/?date=${param.date}&type=${param.when}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((response) => {
                if (response.data && response.data.length === 0) {
                    setIsEmpty(true);
                    setLoading(false);
                }
                if (response.data && response.data?.length !== 0) {
                    if (response.data?.data.length > 0) {
                        dispatch(action.getData(response.data.data));
                    }

                    if (response.data?.images.length > 0) {
                        dispatch(action.getImage(response.data.images));
                    }
                    setLoading(false);
                }
            })
            .catch(async (err) => {
                console.log(err);

                // 액세스토큰이 만료되면
                // 리프레시토큰을 가지고 새로 발급받는다.
                if (err.response.status === 401) {
                    const { exp, token } = await handleExpired();

                    dispatch(
                        authActions.login({
                            token: token.data.access,
                            exp,
                        })
                    );
                } else {
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                }
                setLoading(false);
            });
    };
    useEffect(() => {
        // if (initRecordComponent) {
        //     initRecordComponent = false;
        //     return;
        // } else {
        //     initRecordComponent = true;
        // }
        if (param.when === 'supplement') return;
        if (param.when === 'today') return;
        dispatch(action.removeAll());
        dispatch(postActions.removeAll());
        setLoading(true);

        fetchData();
    }, [dispatch, token]);

    const navigate = useNavigate();
    // 음식 데이터, 이미지 슬라이싱
    const data = useSelector((state) =>
        param.when !== 'water' ? state[param.when].data : null
    );
    const isChanged = useSelector((state) =>
        param.when !== 'water' ? state[param.when].isChanged : null
    );
    const image = useSelector((state) =>
        param.when !== 'water' ? state[param.when].image : null
    );

    // POST 요청을 위한 새 데이터
    // input onchange에 따라 업데이트 해줘야됨.
    const forPostData = useSelector((state) => state.post.data);
    const forPostImage = useSelector((state) => state.post.image);

    const [loading, setLoading] = useState(false);

    // 처음 실행되는지 여부

    // 검색 음식명
    const [foodName, setFoodName] = useState();

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
                dispatch(postActions.addPostImage(base64data));
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

    const savePost = async () => {
        if (forPostData.length > 0 || forPostImage.length > 0) {
            try {
                setLoading(true);
                await axios.post(
                    '/api/v1/consumption/food/',
                    {
                        consumptions: [...forPostData],
                        images: [
                            ...forPostImage.map((item) => {
                                return {
                                    image: item,
                                };
                            }),
                        ],
                        type: param.when,
                        created_at: param.date,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setLoading(false);
                alert('일지 작성이 완료되었습니다!');
            } catch (err) {
                console.log(err);
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                setLoading(false);
            }
        } else if (forPostData.length === 0 && forPostImage.length === 0) {
            if (isChanged) {
                // 사용자 눈속임
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    alert('일기 수정이 완료되었습니다!');
                }, 1000);
            }
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await axios
            .get(`/api/v1/food/?search=${foodName}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.data.results.length === 0) {
                    alert('검색 결과가 없어요!');
                } else {
                    setResult(response.data.results);
                }
            })
            .catch(async (err) => {
                if (err.response.status === 401) {
                    const { exp, token } = await handleExpired();
                    dispatch(
                        authActions.login({
                            token: token.data.access,
                            exp,
                        })
                    );
                } else {
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
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
                    <Name style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                    }}>{menu[0][1]}</Name>
                </DiaryTitle>
                {/* param.when url에 따라 분기하는 장소 */}
                <Name
                    style={{
                        marginBottom: '5px',
                        width: 270,
                        lineHeight: 1.5,
                        textAlign: 'center',
                    }}
                >
                    {param.when === 'supplement'
                        ? '오늘 섭취한 영양제를 기록해주세요 :) 영양제의 이름과 영양성분표의 사진도 도움이 됩니다.'
                        : param.when === 'water'
                        ? '오늘 섭취한 물을 기록해주세요 :)'
                        : param.when === 'today'
                        ? '오늘 섭취한 음식정보를 요약합니다.'
                        : `음식 이미지를 업로드하고 식이정보를 입력하세요 :) 식사의 전후, 식품의 이름과 영양성분표, 식재료구매 영수증이나 외식 영수증의 사진도 도움이 됩니다.`}
                </Name>
                <Name style={{ marginBottom: '50px' }}>
                    {/* 식이정보를 입력하세요 :) */}
                </Name>
                {param.when === 'supplement' ? (
                    <Supplement />
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
                            {image.length > 0 &&
                                image.map((item, index) => (
                                    <FoodImg
                                        data={item}
                                        index={index}
                                        key={item.id}
                                        isPost={false}
                                        setLoading={setLoading}
                                    />
                                ))}
                            {forPostImage.length > 0 &&
                                forPostImage.map((item, index) => (
                                    <FoodImg
                                        data={item}
                                        index={index}
                                        key={item.id}
                                        isPost={true}
                                        setLoading={setLoading}
                                    />
                                ))}
                        </VerticalImageBox>

                        {/* GET해온 데이터와 POST전용 데이터를 분리한다. */}
                        <TagBox>
                            {data
                                ? data.map((item, index) =>
                                      Object.entries(item).length !== 0 ? (
                                          <Tag
                                              onClick={async () => {
                                                  if (
                                                      window.confirm(
                                                          '입력하신 데이터를 지우시겠어요?'
                                                      )
                                                  ) {
                                                      // axios delete 호출
                                                      // 상태값도 지워야 리렌더링 됨
                                                      try {
                                                          dispatch(
                                                              action.removeData(
                                                                  item.id
                                                              )
                                                          );
                                                          dispatch(
                                                              action.isChanged()
                                                          );
                                                          setLoading(true);
                                                          await axios.delete(
                                                              `/api/v1/consumption/food/${item.id}/`,
                                                              {
                                                                  headers: {
                                                                      Authorization: `Bearer ${token}`,
                                                                  },
                                                              }
                                                          );
                                                          setLoading(false);
                                                      } catch (err) {
                                                          console.log(err);
                                                          if (
                                                              err.response
                                                                  .status ===
                                                              401
                                                          ) {
                                                              const {
                                                                  exp,
                                                                  token,
                                                              } =
                                                                  handleExpired();
                                                              dispatch(
                                                                  authActions.login(
                                                                      {
                                                                          token,
                                                                          exp,
                                                                      }
                                                                  )
                                                              );
                                                          } else {
                                                              alert(
                                                                  '오류가 발생했습니다. 담당자에게 문의해주세요!'
                                                              );
                                                          }
                                                          setIsLoading(false);
                                                      }
                                                  }
                                              }}
                                              key={index}
                                          >
                                              {item.name}
                                              {` ${item.amount} (g 또는 ml)`}
                                          </Tag>
                                      ) : null
                                  )
                                : null}
                            {forPostData
                                ? forPostData.map((item, index) =>
                                      Object.entries(item).length !== 0 ? (
                                          <Tag
                                              onClick={() => {
                                                  if (
                                                      window.confirm(
                                                          '입력하신 데이터를 지우시겠어요?'
                                                      )
                                                  ) {
                                                      dispatch(
                                                          postActions.removePostData(
                                                              item.id
                                                          )
                                                      );
                                                  }
                                              }}
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
                            // 음식데이터 저장버튼
                            <button
                                onClick={() => savePost()}
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
