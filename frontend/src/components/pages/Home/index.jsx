import { Contents, Modal } from './styled';
import Card from '../../atom/Card';
import Container from '../../atom/Container';

import diary from '../../../assets/notepad.png';
import record from '../../../assets/record.png';
import analysis from '../../../assets/analysis.png';
import food from '../../../assets/food.png';
import question from '../../../assets/q&a.png';
import { DiaryTitle } from '../Record/styled';
import { Name } from '../../atom/Card/styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useCookies} from 'react-cookie';
import moment from 'moment';

function Home() {
    const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
    const lang = useSelector((state) => state.language.isKorean);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
            return;
        }
    }, [dispatch]);

    const menu = [
        [food, lang ? 'SHOP' : 'shop', 'food'],
        [diary, lang ? 'DIARY' : 'diary', 'diary'],
        [analysis, lang ? 'ANALYSIS' : 'analysis', 'analysis'],
        // [record, lang ? 'HEALTH RECORD' : '내 아이', 'record'],
        [question, lang ? 'QUESTION' : 'q&a', 'question'],
    ];

    // 1회성 모달
    const COOKIE_KEY = 'ForeverHideModal';
    const COOKIE_KEY2 = 'HideModal';
    const [cookies, setCookie] = useCookies([COOKIE_KEY]);
    const [cookies2, setCookie2] = useCookies([COOKIE_KEY2]);

    const hideForeverModal = () => {
        const decade = moment();
        decade.add(3650, 'd');
        setCookie(COOKIE_KEY, 'true',{
            path:'/',
            expires: decade.toDate(),
        });
    };
    const hideModal = () => {
        const decade2 = moment();
        decade2.add(0.01, 'h');
        setCookie2(COOKIE_KEY2, 'true',{
            path:'/',
            expires: decade2.toDate(),
        });
    };

    return (
        <Container>
            <Contents style={{minHeight:'75vh'}}>
                {cookies[COOKIE_KEY] || cookies2[COOKIE_KEY2] ? null:(
                    <Modal>
                        <p>
                            <span style={{textAlign: 'center'}}>NUSEUM pursues a world{'\n'}free of diseases in a sustainable personalized nutrition way</span>
                        {'\n'}{'\n'}
                        식품은 영양소를 제공하는 본질적인 역할 외에도 질병을 예방하고 치료하는 강력한 도구가 될 수 있습니다. 
                        개인화된 영양접근은 중요한데, 특정 식품의 소비와 건강 및 질병 결과 사이의 복잡한 상호작용을 이해하면, 여러 질환의 예방 및 치료를 위한 중재에 정보를 제공할 수 있는 엄청난 잠재력이 있습니다. 
                        서울대학교 영양생리약리연구실 예비창업팀 뉴지엄은 영양과 건강의 더 나은 통합을 지원하고, 고객이 건강한 식품을 선택할 수 있도록 구매 단계에서 지원합니다. 
                        {'\n'}{'\n'}현재 진행 중인 PoC에 참여하여 장보기나 음식 선택에 뉴지엄의 지식을 활용해 보세요. 현재는 만 3-5세의 성장기의 아이들의 신경행동발달을 위해 식이내용의 다양성과 영양성분의 섭취 정도를 분석하지만, 당신의 식이내용의 다양성과 특정 영양성분들의 섭취정도를 파악할 수 있습니다. 
                        {'\n'}{'\n'}뉴지엄의 성장을 위해 q&a에 의견을 남겨주세요. {'\n'}
                        </p>
                        <div style={{width:'100%', bottom: 0, position: 'absolute', display: 'flex', justifyContent:'space-between', borderTop: '1px dotted darkgray'}}>
                            <a onClick={hideForeverModal}> 다시 보지 않기</a>
                            <a onClick={hideModal}> 닫기</a>
                        </div>
                    </Modal>
                )}
                
                <DiaryTitle layoutId={menu[0][2]}>
                    <Name
                        style={{
                            width: '90%',
                            textAlign: 'center',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        {/* {lang
                            ? 'A Study on Customized Nutrition Management and Information Provision'
                            : '맞춤형 영양관리 및 정보제공 연구'} */}
                    </Name>
                </DiaryTitle>
                
                <Card menu={menu} current='home' />
            </Contents>
        </Container>
    );
}

export default Home;
