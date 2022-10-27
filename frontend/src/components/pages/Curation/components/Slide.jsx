import { motion, AnimatePresence } from 'framer-motion';
import {
    CommentBox,
    CurationDataWrapper,
    HashTag,
    Title,
} from '../Curation.styled';
import CurationData from '../CurationData';

import React, { useEffect, useState } from 'react';
import Warn from './Warn';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../../store/auth-slice';
import handleExpired from '../../../../helpers/handleExpired';
import axios from 'axios';

const Slide = ({ date, id }) => {
    const token = useSelector((state) => state.auth.token);
    const dispatch = useDispatch();

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
            <Title>{date.split('T')[0].split('-').join('.')}</Title>
            <Warn recommendData={recommend} />

            <Title>내 아이 맞춤식품</Title>
            <CurationDataWrapper rows={recommend?.data.length / 2}>
                {recommend?.data.map((item, index) => (
                    <CurationData data={item} key={index} />
                ))}
            </CurationDataWrapper>

            <CommentBox>
                {recommend?.comment}

                <p
                    style={{
                        marginTop: 30,
                        width: '80%',
                        textAlign: 'center',
                    }}
                >
                    {recommend?.hashtag?.split('#').map((tag, index) =>
                        tag === '' ? null : (
                            <HashTag
                                href={`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=${tag}`}
                                target='_blank'
                                key={index}
                            >
                                {' '}
                                #{tag}
                            </HashTag>
                        )
                    )}
                </p>
            </CommentBox>
        </>
    );
};

export default React.memo(Slide);
