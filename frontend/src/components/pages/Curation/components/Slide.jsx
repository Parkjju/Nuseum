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
import { authActions } from '../../../../store/auth-slice';
import handleExpired from '../../../../helpers/handleExpired';
import axios from 'axios';
import BottomSheet from '../../../molecules/BottomSheet';
import HashTag from './HashTag';
import prev from '../../../../assets/prev.png';
import next from '../../../../assets/next.png';
import { Link } from 'react-router-dom';
import Btn from '../../../atom/Button/styled';

const Slide = ({ date, id, setVisibleIndex, visibleIndex, length }) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [clickedTag, setClickedTag] = useState('');

    // 각 id 메타데이터에 대한 실제 추천데이터
    const [recommend, setRecommend] = useState({
        data: [
            {
                type: '과일',
                main: ' ',
                list: [],
                order: 0,
            },
            {
                type: '채소',
                main: ' ',
                list: [],
                order: 1,
            },
            {
                type: '콩/두부',
                main: ' ',
                list: [],
                order: 2,
            },
            {
                type: '통곡물',
                main: ' ',
                list: [],
                order: 3,
            },
            {
                type: '버섯',
                main: ' ',
                list: [],
                order: 4,
            },
            {
                type: '해조류',
                main: ' ',
                list: [],
                order: 5,
            },
            {
                type: '견과',
                main: ' ',
                list: [],
                order: 6,
            },
            {
                type: '고기/생선/달걀',
                main: ' ',
                list: [],
                order: 7,
            },
            {
                type: '유제품',
                main: ' ',
                list: [],
                order: 8,
            },
            {
                type: '가공 식품',
                main: ' ',
                list: [],
                order: 9,
            },
            {
                type: '영양제',
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
                내 아이 맞춤식품
            </Title>
            <SubTitle>식재료를 터치해보세요</SubTitle>
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
                편리하게 준비해요
            </Title>
            <SubTitle>식재료를 터치해보세요</SubTitle>
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
                    궁금한 점이 있으시다면 Q&A에 남겨주세요. {'\n'}저희 연구진이
                    돕겠습니다:)
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
