import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../atom/Menu';
import { SearchTitle } from '../../atom/Modal/styled';
import FoodImg from '../../molecules/FoodImg/FoodImg';
import imageCompression from 'browser-image-compression';
import { authActions } from '../../../store/auth-slice';
import { postActions } from '../../../store/meal-slice/post-slice';
import {
    DiaryBody,
    Label,
    ModalInput,
    ModalSearch,
    Tag,
    TagBox,
} from '../Record/styled';
import { VerticalImageBox } from '../Today/Today.style';
import useActions from '../../../hooks/useActions';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const Meal = () => {
    const param = useParams();
    const dispatch = useDispatch();
    const forPostImage = useSelector((state) => state.post.image);
    const forPostData = useSelector((state) => state.post.data);
    const token = useSelector((state) => state.auth.token);

    const [page, setPage] = useState(2);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [searchParam, setSearchParam] = useState('');

    const image = useSelector((state) =>
        param.when !== 'water' ? state[param.when].image : null
    );
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const data = useSelector((state) =>
        param.when !== 'water' ? state[param.when].data : null
    );

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

                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
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
    }, [dispatch]);
    // 액션 훅 호출
    const action = useActions(param.when);

    // scroll 이벤트 핸들링을 위한 클린업 함수
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, offsetHeight } = document.documentElement;
            if (window.innerHeight + scrollTop >= offsetHeight - 100) {
                setIsFetching(true);
            }
        };
        const addEventIdentifier = setTimeout(() => {
            window.addEventListener('scroll', handleScroll);
            window.attached = true;
        }, 500);

        return () => {
            clearTimeout(addEventIdentifier);
            if (window.attached) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [document.documentElement.scrollTop]);

    useEffect(() => {
        if (isFetching && hasNextPage) fetchFoods(); // nextPage가 null이면
        else if (!hasNextPage) setIsFetching(false); // 요청을 취소
    }, [isFetching]);

    const fetchFoods = useCallback(async () => {
        if (searchParam === '') {
            setIsFetching(false);
            setIsLoading(false);
            return;
        }
        try {
            const response = await axios.get(
                `/api/v1/food/?page=${page}&search=${searchParam}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setResult((prev) => [...prev, ...response.data.results]);
            setPage((prev) => prev + 1);
            setHasNextPage(response.data.next ? true : false);
            setIsFetching(false);
        } catch (err) {
            console.log(err);

            alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            setLoading(false);
        }
    }, [page, searchParam]);

    // 검색 음식명
    const [foodName, setFoodName] = useState('');

    const onChangeName = (e) => {
        setFoodName(e.target.value);
    };

    // 검색결과 배열
    const [result, setResult] = useState([]);
    // 테스트 주석
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
                dispatch(action.getData(forPostData));
                dispatch(action.getImage(forPostImage));
                dispatch(postActions.removeAll());
                alert('일지 작성이 완료되었습니다!');
            } catch (err) {
                console.log(err);
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
                setLoading(false);
            }
        } else if (forPostData.length === 0 && forPostImage.length === 0) {
            // 사용자 눈속임
            setLoading(true);
            setTimeout(() => {
                dispatch(postActions.removeAll());

                setLoading(false);
                alert('일기 수정이 완료되었습니다!');
            }, 1000);
        }
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
                dispatch(postActions.addPostImage(base64data));
            };
        } catch (error) {
            console.log(error);
        }
    };
    const onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            actionImgCompress(e.target.files[0]);
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
            .then(async (response) => {
                if (response.data.results.length === 0) {
                    alert('검색 결과가 없어요!');
                } else {
                    setResult(response.data.results);
                    console.log(response.data);
                }
            })
            .catch(async (err) => {
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            });

        setSearchParam(foodName);
        setFoodName('');
        setIsLoading(false);
    };

    return (
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
                                                  action.removeData(item.id)
                                              );
                                              dispatch(action.isChanged());
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
                찾고싶은 음식을 작성한 후 엔터해주세요. 섭취량을 작성한 후
                엔터해주세요. 찾고 싶은 음식이 없다면 가장 유사한 것으로
                선택해주세요. 관련된 내용을 Q&A에 적어주세요.
            </SearchTitle>
            <ModalSearch as='form' onSubmit={onSubmit}>
                <span className='material-symbols-outlined'>search</span>
                <ModalInput value={foodName} onChange={onChangeName} />
            </ModalSearch>

            {loading ? (
                <CircularProgress sx={{ marginBottom: 5 }} />
            ) : (
                // 음식데이터 저장버튼
                <button
                    onClick={() => savePost()}
                    style={{
                        marginBottom: '30px',
                        background: '#8A8A8E',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '5px 35px',
                        color: 'white',
                    }}
                >
                    저장
                </button>
            )}

            {isLoading ? (
                <CircularProgress sx={{ marginBottom: 5 }} />
            ) : (
                <Menu data={result} />
            )}
            {isFetching ? <CircularProgress sx={{ marginBottom: 5 }} /> : null}
        </DiaryBody>
    );
};

export default Meal;
