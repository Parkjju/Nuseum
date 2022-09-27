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
import { useRecoilState } from 'recoil';
import axios from 'axios';
import Menu from '../../atom/Menu';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import imageCompression from 'browser-image-compression';
import { postIdState } from '../../../recoil/postID/postId';
import FoodImg from '../../molecules/FoodImg/FoodImg';
import ImageCard from '../../molecules/ImageCard';
import Water from '../Water';
import Today from '../Today';
import { VerticalImageBox } from '../Today/Today.style';
import { useDispatch, useSelector } from 'react-redux';
import useActions from '../../../hooks/useActions';
import { postActions } from '../../../store/meal-slice/post-slice';

let init = true;
function Record() {
    const param = useParams();

    // useEffect로 받아온 데이터가 비어있다면
    const [isEmpty, setIsEmpty] = useState(false);
    const supplementData = useSelector((state) => state.supplement.data);

    // 액션 훅 호출
    const action = useActions(param.when);

    // POST전용을 dispatch로 다룬다.
    // useEffect로 저장되는 상태값을 useState로 관리
    const [fetchedSupplement, setFetchedSupplement] = useState([]);
    const [isRequestSent, setIsRequestSent] = useState(false);

    // 디스패치 훅 임포트
    const dispatch = useDispatch();

    useEffect(() => {
        if (init) {
            init = false;
            dispatch(action.removeAll());
            setLoading(true);

            axios
                .get(
                    `https://nuseum-v2.herokuapp.com/api/v1/consumption/food/?date=${param.date}&type=${param.when}`
                )
                .then((response) => {
                    if (response.data && response.data.length === 0) {
                        setIsEmpty(true);
                        setLoading(false);
                        return;
                    }
                    if (response.data) {
                        if (response.data.data.length > 0) {
                            dispatch(action.getData(response.data.data));
                        }

                        if (response.data.images.length > 0) {
                            dispatch(action.getImage(response.data.images));
                        }
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                    setLoading(false);
                });

            return;
        } else {
            init = true;
        }
    }, [dispatch]);

    useEffect(() => {
        axios
            .get(
                `https://nuseum-v2.herokuapp.com/api/v1/consumption/supplement/?date=${param.date}`
            )
            .then((response) => {
                if (response.data?.consumptions.length > 0) {
                    setFetchedSupplement(response.data.consumptions);
                }
                dispatch(action.removeAll());
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                setLoading(false);
            });
    }, [dispatch, isRequestSent]);

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

    const addSupplement = () => {
        dispatch(
            action.getData([
                {
                    image: '',
                    name: '',
                    manufacturer: '',
                },
            ])
        );
    };

    const isEmptyFieldExistsInSupplement = () => {
        for (let obj of supplementData) {
            for (let key of Object.keys(obj)) {
                if (key === 'image') continue;
                if (obj[key] === '') {
                    return true;
                }
            }
        }
        return false;
    };

    const saveSupplement = async () => {
        if (isEmptyFieldExistsInSupplement()) {
            alert('제조사와 영양제 이름, 이미지는 필수 입력입니다!');
            return;
        }
        try {
            setLoading(true);
            await axios.post(
                'https://nuseum-v2.herokuapp.com/api/v1/consumption/supplement/',
                {
                    type: 'supplement',
                    created_at: param.date,
                    consumptions: supplementData,
                }
            );
            alert('일기 저장이 완료되었습니다!');
            dispatch(action.checkDataSaved());
            setIsRequestSent(true);
            setLoading(false);
        } catch (error) {
            console.log(error);
            alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            setIsRequestSent(false);
            setLoading(false);
        }
    };

    const savePost = async () => {
        if (forPostData.length > 0 || forPostImage.length > 0) {
            try {
                setLoading(true);
                await axios.post(
                    'https://nuseum-v2.herokuapp.com/api/v1/consumption/food/',
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
                    }
                );
                setLoading(false);
                alert('일지 수정이 완료되었습니다!');
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
            .get(
                `https://nuseum-v2.herokuapp.com/api/v1/food/?search=${foodName}`
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
                            onClick={addSupplement}
                            style={{ marginBottom: 20 }}
                        >
                            추가하기
                        </button>

                        {fetchedSupplement.length === 0
                            ? null
                            : fetchedSupplement.map((item, index) =>
                                  Object.keys(item).length === 0 ? null : (
                                      <ImageCard
                                          isSaved={item?.saved}
                                          index={index}
                                          key={index}
                                          data={item}
                                          setFetchedSupplement={
                                              setFetchedSupplement
                                          }
                                      />
                                  )
                              )}
                        {supplementData.length === 0
                            ? null
                            : supplementData.map((item, index) =>
                                  Object.keys(item).length === 0 ? null : (
                                      <ImageCard
                                          isSaved={item?.saved}
                                          index={index}
                                          key={index}
                                          data={item}
                                      />
                                  )
                              )}

                        {loading ? (
                            <CircularProgress sx={{ marginBottom: 5 }} />
                        ) : (
                            <button
                                // 영양제 저장하는 버튼이었음
                                onClick={() => saveSupplement()}
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
                            {image.length > 0 &&
                                image.map((item, index) => (
                                    <FoodImg
                                        data={item}
                                        index={index}
                                        key={item.id}
                                        isPost={false}
                                    />
                                ))}
                            {forPostImage.length > 0 &&
                                forPostImage.map((item, index) => (
                                    <FoodImg
                                        data={item}
                                        index={index}
                                        key={item.id}
                                        isPost={true}
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
                                                              `https://nuseum-v2.herokuapp.com/api/v1/consumption/food/${item.id}/`
                                                          );
                                                          setLoading(false);
                                                      } catch (err) {
                                                          console.log(err);
                                                          alert(
                                                              '오류가 발생했습니다. 담당자에게 문의해주세요!'
                                                          );
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
