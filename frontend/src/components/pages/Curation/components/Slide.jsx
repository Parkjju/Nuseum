import {
    CommentBox,
    CurationDataWrapper,
    SubTitle,
    Title,
} from '../Curation.styled';
import CurationData from '../CurationData';

import React, { useEffect, useState } from 'react';
import Warn from './Warn';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import BottomSheet from '../../../molecules/BottomSheet';
import HashTag from './HashTag';
import prev from '../../../../assets/prev.png';
import next from '../../../../assets/next.png';
import { Link } from 'react-router-dom';
import Btn from '../../../atom/Button/styled';

const Slide = ({ date, id, setVisibleIndex, visibleIndex, length }) => {
    const lang = useSelector((state) => state.language.isKorean);
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [clickedTag, setClickedTag] = useState('');

    // 각 id 메타데이터에 대한 실제 추천데이터
    const [recommend, setRecommend] = useState({
        data: [
            {
                type: lang ? 'Fruit' : '과일',
                main: ' ',
                list: [],
                order: 0,
            },
            {
                type: lang ? 'Vegetable' : '채소',
                main: ' ',
                list: [],
                order: 1,
            },
            {
                type: lang ? 'Bean/tofu' : '콩/두부',
                main: ' ',
                list: [],
                order: 2,
            },
            {
                type: lang ? 'Whole grains' : '통곡물',
                main: ' ',
                list: [],
                order: 3,
            },
            {
                type: lang ? 'Mushroom' : '버섯',
                main: ' ',
                list: [],
                order: 4,
            },
            {
                type: lang ? 'Seaweed' : '해조류',
                main: ' ',
                list: [],
                order: 5,
            },
            {
                type: lang ? 'Nuts' : '견과',
                main: ' ',
                list: [],
                order: 6,
            },
            {
                type: lang ? 'Meat/Fish/Eggs' : '고기/생선/달걀',
                main: ' ',
                list: [],
                order: 7,
            },
            {
                type: lang ? 'Milk products' : '유제품',
                main: ' ',
                list: [],
                order: 8,
            },
            {
                type: lang ? 'Processed food' : '가공 식품',
                main: ' ',
                list: [],
                order: 9,
            },
            {
                type: lang ? 'Supplement' : '영양제',
                main: ' ',
                list: [],
                order: 10,
            },
            {
                type: '주의',
                main: ' ',
                list: [],
                order: 11,
            },
        ],
        comment: '',
    });

    useEffect(() => {
        console.log('recommend : ', recommend);
        if (lang) {
            for (let index in recommend.data) {
                switch (recommend.data[index].type) {
                    case '견과':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Nuts';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '채소':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Vegetable';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '과일':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Fruit';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '버섯':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Mushroom';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '해조류':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Seaweed';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '통곡물':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Whole grain';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '콩/두부':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Bean/tofu';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '고기/생선/달걀':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Meat/Fish/Eggs';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '유제품':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Milk product';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '영양제':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Supplement';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case '가공 식품':
                        setRecommend((prev) => {
                            prev.data[index].type = 'Processed food';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    default:
                        break;
                }
            }
        } else {
            for (let index in recommend.data) {
                switch (recommend.data[index].type) {
                    case 'Nuts':
                        setRecommend((prev) => {
                            prev.data[index].type = '견과';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Vegetable':
                        setRecommend((prev) => {
                            prev.data[index].type = '채소';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Fruit':
                        setRecommend((prev) => {
                            prev.data[index].type = '과일';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Mushroom':
                        setRecommend((prev) => {
                            prev.data[index].type = '버섯';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Seaweed':
                        setRecommend((prev) => {
                            prev.data[index].type = '해조류';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Whole grain':
                        setRecommend((prev) => {
                            prev.data[index].type = '통곡물';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Bean/tofu':
                        setRecommend((prev) => {
                            prev.data[index].type = '콩/두부';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Meat/Fish/Eggs':
                        setRecommend((prev) => {
                            prev.data[index].type = '고기/생선/달걀';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Milk product':
                        setRecommend((prev) => {
                            prev.data[index].type = '유제품';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Supplement':
                        setRecommend((prev) => {
                            prev.data[index].type = '영양제';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    case 'Processed food':
                        setRecommend((prev) => {
                            prev.data[index].type = '가공 식품';
                            return {
                                ...prev,
                                [prev.data]: [...prev.data],
                            };
                        });
                        break;
                    default:
                        break;
                }
            }
        }
    }, [lang, recommend]);

    const fetchRecommend = async () => {
        try {
            const response = await axios.get(
                `/api/v1/recommendation/user/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setRecommend(response.data);
        } catch (err) {
            console.log(err);
            if (!id) return;

            alert(
                lang
                    ? 'An error has occurred. Please contact the developer!'
                    : '오류가 발생했습니다. 담당자에게 문의해주세요!'
            );
        }
    };

    useEffect(() => {
        fetchRecommend();
    }, [id]);

    return (
        <>
            <Title>
                <img
                    onClick={() => setVisibleIndex('prev')}
                    src={prev}
                    style={{
                        width: 30,
                        cursor: 'pointer',
                        opacity: `${visibleIndex === 0 ? 0.5 : null}`,
                    }}
                    alt='Previous'
                />
                <span style={{ margin: '0 20px' }}>
                    {date.split('T')[0].split('-').join('.')}
                </span>
                <img
                    onClick={() => setVisibleIndex('next')}
                    src={next}
                    style={{
                        width: 30,
                        cursor: 'pointer',
                        opacity: `${visibleIndex === length - 1 ? 0.5 : null}`,
                    }}
                    alt='Next'
                />
            </Title>
            <Warn recommendData={recommend} />

            <Title style={{ marginBottom: 0, lineHeight: 1.5 }}>
                {lang ? 'Food for my child' : '내 아이 맞춤식품'}
            </Title>
            <SubTitle>
                {lang ? 'Click on the ingredients' : '식재료를 터치해 보세요'}
            </SubTitle>
            <CurationDataWrapper rows={recommend?.data.length / 2}>
                {recommend?.data.map((item, index) => (
                    <CurationData
                        setIsOpen={setIsOpen}
                        setClickedTag={setClickedTag}
                        data={item}
                        key={index}
                    />
                ))}
            </CurationDataWrapper>

            <CommentBox>{recommend?.comment}</CommentBox>

            <Title style={{ marginTop: 40, marginBottom: 0, lineHeight: 1.5 }}>
                {lang ? 'Make it convenient' : '편리하게 준비해요'}
            </Title>
            <SubTitle>
                {lang
                    ? 'Click on the name of the food'
                    : '음식명을 터치해 보세요'}
            </SubTitle>
            <div
                style={{
                    marginBottom: 30,
                    display: 'flex',
                    width: '90%',
                    flexWrap: 'wrap',
                }}
            >
                {recommend?.hashtag?.split('#').map((tag, index) =>
                    tag === '' ? null : (
                        <HashTag
                            onClick={() => {
                                setIsOpen(true);
                                setClickedTag(`#${tag}`);
                            }}
                            key={index}
                        >
                            {' '}
                            #{tag}
                        </HashTag>
                    )
                )}
            </div>

            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    marginTop: 40,
                }}
            >
                <p
                    style={{
                        whiteSpace: 'pre-line',
                        textAlign: 'center',
                        lineHeight: 1.5,
                        fontWeight: 400,
                        marginBottom: 10,
                    }}
                >
                    {lang
                        ? 'If you have any questions, please leave them on Q&A.\n Our researchers will help you :)'
                        : `궁금한 점이 있으시다면 Q&A에 남겨주세요. ${'\n'}저희 연구진이 돕겠습니다:)`}
                </p>

                <Btn
                    as={Link}
                    to='/question'
                    style={{ textDecoration: 'none' }}
                >
                    Q&A
                </Btn>
            </div>

            {isOpen ? (
                <BottomSheet setIsOpen={setIsOpen} clickedTag={clickedTag} />
            ) : null}
        </>
    );
};

export default React.memo(Slide);
