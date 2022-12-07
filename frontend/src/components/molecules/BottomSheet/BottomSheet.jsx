import { AnimatePresence, useIsPresent } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Background,
    CloseButton,
    Modal,
    TagName,
    URL,
    URLBox,
    URLName,
} from './BottomSheet.styled';
import ModalSheet from './ModalSheet';
// 쿠팡. 이마트몰. 마켓컬리. 오아시스. 한살림. GS프레시몰. 홈플러스. 네이버쇼핑

const BottomSheet = ({ setIsOpen, clickedTag }) => {
    const [isOpenModal, setIsOpenModal] = useState(true);
    const lang = useSelector((state) => state.language.isKorean);
    const urlList = useMemo(
        () => [
            {
                url: 'https://www.coupang.com/np/search?component=&channel=user&',
                query: 'q',
                name: lang ? 'Coupang' : '쿠팡',
            },
            {
                url: 'https://emart.ssg.com/search.ssg?target=all&',
                query: 'query',
                name: lang ? 'Emart Mall' : '이마트몰',
            },
            {
                url: 'https://www.kurly.com/search?',
                query: 'sword',
                name: lang ? 'Market Kurly' : '마켓컬리',
            },
            {
                url: 'https://www.oasis.co.kr/product/search?&page=1&sort=priority&direction=desc&corpId=&couponType=&rows=60&',
                query: 'keyword',
                name: lang ? 'Oasis' : '오아시스',
            },
            {
                url: 'https://shop.hansalim.or.kr/shopping/prod/searchList.do?',
                query: 'SRCH_WD',
                name: lang ? 'Hansalim' : '한살림',
            },
            {
                url: 'https://m.gsfresh.com/shop/search/searchSect.gs?&mseq=S-11209-0301&',
                query: 'tq',
                name: lang ? 'GS Fresh Mall' : 'GS 프레시몰',
            },
            {
                url: 'https://front.homeplus.co.kr/search?entry=direct&',
                query: 'keyword',
                name: lang ? 'Homeplus' : '홈플러스',
            },
            {
                url: 'https://search.shopping.naver.com/search/all?&cat_id=&frm=NVSHATC&',
                query: 'query',
                name: lang ? 'Naver Shopping' : '네이버 쇼핑',
            },
            {
                url: 'https://www.youtube.com/results?',
                query: 'search_query',
                name: lang ? 'Youtube' : '유튜브',
            },
            {
                url: 'https://section.blog.naver.com/Search/Post.naver?pageNo=1&rangeType=ALL&orderBy=sim&',
                query: 'keyword',
                name: lang ? 'Naver Blog' : '네이버 블로그',
            },
            {
                url: 'https://www.10000recipe.com/recipe/list.html?',
                query: 'q',
                name: lang ? '10000recipe' : '만개의 레시피',
            },
        ],
        []
    );

    return (
        // 태그명 연동
        // 쿼리값 연동
        <Background
            onClick={() => {
                setIsOpenModal(false);
            }}
        >
            <AnimatePresence>
                {isOpenModal ? (
                    <ModalSheet
                        setIsOpen={setIsOpen}
                        clickedTag={clickedTag}
                        urlList={urlList}
                        setIsOpenModal={setIsOpenModal}
                    />
                ) : null}
            </AnimatePresence>
        </Background>
    );
};

export default BottomSheet;
