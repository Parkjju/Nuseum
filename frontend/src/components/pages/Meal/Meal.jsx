import { CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../atom/Menu';
import { SearchTitle } from '../../atom/Modal/styled';
import FoodImg from '../../molecules/FoodImg/FoodImg';
import imageCompression from 'browser-image-compression';
import { authActions } from '../../../store/auth-slice';
import * as S from '../Analysis/Analysis.style';
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
import { Name } from '../../atom/Card/styled';
import RadarGraph from '../../molecules/RadarGraph';
import a from '../../../assets/category/1.png';
import b from '../../../assets/category/2.png';
import c from '../../../assets/category/3.png';
import d from '../../../assets/category/4.png';
import e from '../../../assets/category/5.png';
import f from '../../../assets/category/6.png';
import g from '../../../assets/category/7.png';
import h from '../../../assets/category/8.png';
import i from '../../../assets/category/9.png';
import { useQuery } from 'react-query';
import { fetchDailyFood } from '../../../api';

const Meal = () => {
    const param = useParams();
    const dispatch = useDispatch();

    // POST요청 전 임시 데이터 저장을 위한 변수
    const forPostImage = useSelector((state) => state.post.image);
    const forPostData = useSelector((state) => state.post.data);

    // 액세스토큰
    const token = useSelector((state) => state.auth.token);

    // 끼니별 영양성분 / 골고루지수
    const nutrition = useSelector((state) => state[param.when].nutrition);
    const [dailyCategory, setDailyCategory] = useState([]);

    // 한-영 상태
    const lang = useSelector((state) => state.language.isKorean);

    // 영양성분 삭제 후 그래프에 반영하기 위함
    const removingNutrition = useSelector((state) => state.post.removingData);
    const actionRemovingNutrition = useSelector((state) =>
        param.when !== 'water' ? state[param.when].removingData : null
    );

    // 건강기능식품 영양성분
    const [nutritionAboutSupplement, setNutritionAboutSupplement] = useState({
        energy: 0,
        protein: 0,
        fat: 0,
        carbohydrate: 0,
        dietary_fiber: 0,
        magnesium: 0,
        vitamin_a: 0,
        vitamin_d: 0,
        vitamin_b6: 0,
        folic_acid: 0,
        vitamin_b12: 0,
        tryptophan: 0,
        dha_epa: 0,
    });

    // 건강기능식품을 제외한 영양성분 섭취현황 데이터
    const [nutritionWithoutSupplement, setNutritionWithoutSupplement] =
        useState(null);

    // react-query - 끼니별 데이터 GET
    // refetch 안하기
    const queryResult = useQuery(
        ['food', param.date, param.when, token],
        fetchDailyFood,
        {
            onSuccess: (response) => {
                if (response.data && response.data.length === 0) {
                    setLoading(false);
                }

                if (response.data && response.data?.length !== 0) {
                    if (response.data?.data.length > 0) {
                        dispatch(action.getData(response.data.data));
                    }
                    for (let obj of response.data.data) {
                        dispatch(action.setNutrition(obj));

                        let copy = {
                            1: false,
                            2: false,
                            3: false,
                            4: false,
                            5: false,
                            6: false,
                            7: false,
                            8: false,
                            9: false,
                        };
                        let category = {
                            채소: 1,
                            과일: 2,
                            '콩/두부': 3,
                            통곡물: 4,
                            버섯: 5,
                            해조류: 6,
                            견과: 7,
                            '고기/생선/달걀': 8,
                            유제품: 9,
                            버섯류: 5,
                            채소류: 1,
                        };

                        for (let data of forPostData) {
                            // obj.category -> forPostData 순회 객체마다 갖고있는 카테고리 체크
                            // category[obj.category] -> 1~9까지 숫자 반환
                            // copy에서 다시 체크하고 dailyCategory에 반영하는 작업
                            // copy[category[obj.category]] = true;
                            copy[category[data.category]] = true;
                        }

                        setDailyCategory({ ...copy });
                    }

                    if (response.data?.images.length > 0) {
                        dispatch(action.getImage(response.data.images));
                    }
                    setLoading(false);
                }
            },
            onError: (error) => {
                console.log(error);
                if (error.response.status === 401) {
                    setLoading(false);
                    return;
                }
                alert(
                    lang
                        ? 'An error has occurred. Please contact the developer!'
                        : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                );
                setLoading(false);
            },
            refetchOnWindowFocus: false,
        }
    );

    // 무한스크롤 도구들
    const [page, setPage] = useState(2);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [isFetching, setIsFetching] = useState(false);
    const [searchParam, setSearchParam] = useState('');

    // 이미지
    const image = useSelector((state) =>
        param.when !== 'water' ? state[param.when].image : null
    );

    // 로딩상태 - loading이랑 isLoading 통합시키기
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // 골고루지수
    const [nutrientPoint, setNutrientPoint] = useState(0);

    useEffect(() => {
        let pointNutrient = 0;

        for (let i in dailyCategory) {
            if (dailyCategory[i]) {
                pointNutrient += 1;

                if (i === 8 || i === 9) {
                    continue;
                }
            }
        }

        setNutrientPoint(pointNutrient);
    }, [dailyCategory]);

    const data = useSelector((state) =>
        param.when !== 'water' ? state[param.when].data : null
    );

    // 영양제 전체 데이터 합산된 후 UseEffect
    useEffect(() => {
        let copy = { ...nutrition };
        for (let key in copy) {
            copy[key] -= nutritionAboutSupplement[key];
        }
        setNutritionWithoutSupplement({ ...copy });
    }, [nutritionAboutSupplement]);
    useEffect(() => {
        // 영양제는 어차피 forPost로만 사용할수밖에 없음
        // post전용 데이터에 변화가 생기면 -> 영양제 데이터가 추가되었는지 순회하여 체크
        // NutritionAboutSupplement 합산값 전체 0으로 한번 초기화 한 뒤 순회 시작

        setNutritionAboutSupplement({
            energy: 0,
            protein: 0,
            fat: 0,
            carbohydrate: 0,
            dietary_fiber: 0,
            magnesium: 0,
            vitamin_a: 0,
            vitamin_d: 0,
            vitamin_b6: 0,
            folic_acid: 0,
            vitamin_b12: 0,
            tryptophan: 0,
            dha_epa: 0,
        });

        // forPostData중 카테고리가 영양제인 데이터들만 뽑아서 순회
        // 객체라서 useEffect다시 실행되더라도 영양제는 fetch하는 단계에서 있을수가 없으므로
        // 해당 로직에는 문제 없음.
        for (let obj of forPostData) {
            if (obj.category === '영양제') {
                setNutritionAboutSupplement((prev) => {
                    let copy = { ...prev };
                    for (let key in prev) {
                        copy[key] += obj[key];
                    }
                    return { ...copy };
                });
            }
        }
    }, [forPostData]);

    // fetchedData 삭제 이후 영양성분 세팅 다시해주는 로직
    useEffect(() => {
        let obj = {};
        for (let key in actionRemovingNutrition) {
            if (
                key === 'amount' ||
                key === 'food' ||
                key === 'id' ||
                key === 'name'
            )
                continue;
            obj[key] = actionRemovingNutrition[key];
        }

        dispatch(action.subtractNutrition(obj));

        // 일반 nutrition에서 음식 제거되면
        // supplement 제외한 nutrition에서도 해당 음식 영양성분을 제해줘야함
        setNutritionWithoutSupplement((prev) => {
            let copy = { ...prev };
            for (let key in copy) {
                copy[key] -= obj[key];
            }
            return { ...copy };
        });
    }, [actionRemovingNutrition]);

    // forPostData 삭제 이후 영양성분 세팅 다시해주는 로직
    useEffect(() => {
        // obj 객체에 삭제 대상 영양성분 뽑아서 가져오기
        let obj = {};

        // 영양성분에 해당하는 키값만 뽑아오기
        for (let key in removingNutrition) {
            if (
                key === 'amount' ||
                key === 'food' ||
                key === 'id' ||
                key === 'name'
            )
                continue;
            obj[key] = removingNutrition[key];
        }

        // 상태값 세팅하는 로직
        dispatch(action.subtractNutrition(obj));

        setNutritionWithoutSupplement((prev) => {
            let copy = { ...prev };
            for (let key in copy) {
                copy[key] -= obj[key];
            }
            return { ...copy };
        });
    }, [removingNutrition]);

    // forPostData / data 길이가 바뀌면 카테고리 표기 수정
    useEffect(() => {
        let copy = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
        };
        let category = {
            채소: 1,
            과일: 2,
            '콩/두부': 3,
            통곡물: 4,
            버섯: 5,
            해조류: 6,
            견과: 7,
            '고기/생선/달걀': 8,
            유제품: 9,
            버섯류: 5,
            채소류: 1,
        };

        for (let obj of forPostData) {
            // obj.category -> forPostData 순회 객체마다 갖고있는 카테고리 체크
            // category[obj.category] -> 1~9까지 숫자 반환
            // copy에서 다시 체크하고 dailyCategory에 반영하는 작업
            // copy[category[obj.category]] = true;
            copy[category[obj.category]] = true;
        }

        setDailyCategory({ ...copy });
    }, [forPostData.length, data.length]);

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
            if (err.response.status === 404) {
                setIsFetching(false);
                return;
            }
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
    // 음식 저장로직
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
                alert(
                    lang
                        ? 'Your diary has been completed!'
                        : '일지 작성이 완료되었습니다!'
                );
            } catch (err) {
                console.log(err);
                if (err.response.status === 401) {
                    setLoading(false);
                    return;
                }
                alert(
                    lang
                        ? 'An error has occurred. Please contact the developer!'
                        : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                );
                setLoading(false);
            }
        } else if (forPostData.length === 0 && forPostImage.length === 0) {
            // 사용자 눈속임
            setLoading(true);
            setTimeout(() => {
                dispatch(postActions.removeAll());

                setLoading(false);
                alert(
                    lang
                        ? 'Modifying your diary has been completed!'
                        : '일기 수정이 완료되었습니다!'
                );
            }, 1000);
        }
    };
    // 이미지 컴프레싱 로직
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
            if (err.response.status === 401) {
                setLoading(false);
                return;
            }
            console.log(error);
        }
    };
    const onChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            actionImgCompress(e.target.files[0]);
        }
    };

    // 서브밋 로직
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
                    alert(
                        lang
                            ? 'No search results found.'
                            : '검색 결과가 없습니다!'
                    );
                } else {
                    setResult(response.data.results);
                    console.log(response.data);
                }
            })
            .catch(async (err) => {
                if (err.response.status === 401) {
                    setLoading(false);
                    return;
                }
                alert(
                    lang
                        ? 'An error has occurred. Please contact the developer!'
                        : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                );
            });

        setSearchParam(foodName);
        setFoodName('');
        setIsLoading(false);
    };

    // 그래프 데이터 초기화를 위한 useEffect
    useEffect(() => {
        let copy = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
            6: false,
            7: false,
            8: false,
            9: false,
        };

        setDailyCategory({ ...copy });
        dispatch(action.initializeNutrition());
        dispatch(
            action.setNutrition({
                energy: 0,
                protein: 0,
                fat: 0,
                carbohydrate: 0,
                dietary_fiber: 0,
                magnesium: 0,
                vitamin_a: 0,
                vitamin_d: 0,
                vitamin_b6: 0,
                folic_acid: 0,
                vitamin_b12: 0,
                tryptophan: 0,
                dha_epa: 0,
            })
        );
    }, []);

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

            <VerticalImageBox style={{ width: '90%' }}>
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
                                              lang
                                                  ? 'Do you want to delete the data?'
                                                  : '입력하신 데이터를 지우시겠어요?'
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
                                              if (err.response.status === 401) {
                                                  setLoading(false);
                                                  return;
                                              }

                                              alert(
                                                  lang
                                                      ? 'An error has occurred. Please contact the developer!'
                                                      : '오류가 발생했습니다. 담당자에게 문의해주세요!'
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
                                              lang
                                                  ? 'Do you want to delete the data?'
                                                  : '입력하신 데이터를 지우시겠어요?'
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

            <SearchTitle>{lang ? '' : ''}</SearchTitle>
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
                        background: '#586162',
                        border: 'none',
                        borderRadius: '20px',
                        padding: '5px 35px',
                        color: 'white',
                    }}
                >
                    {lang ? 'Save' : '저장'}
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
