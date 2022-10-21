import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import CurationData from './CurationData';
import bean from '../../../assets/curation/bean.png';
import meat from '../../../assets/curation/meat.png';
import milk from '../../../assets/curation/milk.png';
import mushroom from '../../../assets/curation/mushroom.png';
import nut from '../../../assets/curation/nut.png';
import processed from '../../../assets/curation/processed.png';
import rice from '../../../assets/curation/rice.png';
import seeweed from '../../../assets/curation/seeweed.png';
import strawberry from '../../../assets/curation/strawberry.png';
import supplement from '../../../assets/curation/supplement.png';
import vegetable from '../../../assets/curation/vegetable.png';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleExpired from '../../../helpers/handleExpired';
import { authActions } from '../../../store/auth-slice';
import { useState } from 'react';
import { CommentBox } from './Curation.styled';

const dummyData = {
    data: [
        {
            type: '과일',
            main: '아보카도',
            list: ['복분자', '살구', '아로니아', '블랙베리'],
            image: strawberry,
        },
        {
            type: '채소',
            main: '애호박',
            list: ['유채', '메밀', '쑥갓', '홑잎나물'],
            image: vegetable,
        },
        {
            type: '콩/두부',
            main: '서리태',
            list: ['흑태', '두부,유부', '콩조림(콩자반)', '강낭콩'],
            image: bean,
        },
        {
            type: '통곡물',
            main: '귀리, 오트밀',
            list: ['겉보리, 할맥', '찰보리', '통밀', '찰수수'],
            image: rice,
        },
        {
            type: '버섯',
            main: '목이버섯',
            list: [
                '느타리 버섯',
                '양송이 버섯',
                '표고버섯',
                '능이버섯(향버섯)',
            ],
            image: mushroom,
        },
        {
            type: '해조류',
            main: '김',
            list: ['미역튀각', '김밥용김', '매생이', '파래'],
            image: seeweed,
        },
        {
            type: '견과',
            main: '호박씨',
            list: ['해바라기씨', '브라질너트', '아몬드', '피스타치오넛'],
            image: nut,
        },
        {
            type: '고기/생선/달걀',
            main: '방어',
            list: ['큰가리비', '소고기, 안심', '고등어', '연어'],
            image: meat,
        },
        {
            type: '유제품',
            main: '치즈,모짜렐라',
            list: ['치즈, 파마산', '치즈, 고다', '치즈, 브릭', '치즈, 브리'],
            image: milk,
        },
        {
            type: '가공 식품',
            main: '후디스하이키드 밀크',
            list: [
                '일동프리미엄하이키드',
                '후디스하이키드쵸코',
                '메디푸드 RTH(알티에이치)당뇨식 글루트롤500',
                '메디웰RTH DM(알티에이치 디엠)',
            ],
            image: processed,
        },
        {
            type: '영양제',
            main: '영양제1',
            list: ['영양제2', '영양제3', '영양제4', '영양제5'],
            image: supplement,
        },
    ],
};

const Curation = () => {
    const dispatch = useDispatch();
    const [recommendId, setRecommendId] = useState(null);
    const token = useSelector((state) => state.auth.token);
    const [recommendData, setRecommendData] = useState(null);

    const fetchId = async () => {
        try {
            const response = await axios.get('/api/v1/recommendation/user/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setRecommendId(response.data[0].id);
        } catch (err) {
            console.log(err);
            if (!recommendId) return;
            if (err.response?.status === 401) {
                const { exp, token } = await handleExpired();
                dispatch(
                    authActions.login({
                        token: token.data.access,
                        exp,
                    })
                );
            } else {
                if (!recommendId) return;
                alert('오류가 발생했습니다. 담당자에게 문의해주세요!');
            }
        }
    };
    console.log(recommendData);

    const fetchRecommend = async () => {
        try {
            const response = await axios.get(
                `/api/v1/recommendation/user/${recommendId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setRecommendData(response.data);
        } catch (err) {
            console.log(err);
            if (!recommendId) return;
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
        fetchId();
    }, []);
    useEffect(() => {
        fetchRecommend();
    }, [recommendId]);
    return (
        <Container>
            <Contents>
                {recommendData?.data.map((item, index) => (
                    <CurationData data={item} key={index} />
                ))}
                <CommentBox>{recommendData?.comment}</CommentBox>
            </Contents>
        </Container>
    );
};

export default Curation;
