import { AnimatePresence, useIsPresent } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
    Background,
    Modal,
    TagName,
    URL,
    URLBox,
    URLName,
} from './BottomSheet.styled';
import ModalSheet from './ModalSheet';

const urlList = [
    {
        url: 'https://www.coupang.com/np/search?component=&channel=user&',
        query: 'q',
        name: '쿠팡',
    },
    {
        url: 'https://emart.ssg.com/search.ssg?target=all&',
        query: 'query',
        name: '이마트몰',
    },
    {
        url: 'https://www.kurly.com/search?',
        query: 'sword',
        name: '마켓컬리',
    },
    {
        url: 'https://m.gsfresh.com/shop/search/searchSect.gs?&mseq=S-11209-0301&',
        query: 'tq',
        name: 'GS 프레시몰',
    },
    {
        url: 'https://www.oasis.co.kr/product/search?&page=1&sort=priority&direction=desc&corpId=&couponType=&rows=60&',
        query: 'keyword',
        name: '오아시스',
    },
    {
        url: 'https://shop.hansalim.or.kr/shopping/prod/searchList.do?',
        query: 'SRCH_WD',
        name: '한살림',
    },
    {
        url: 'https://search.shopping.naver.com/search/all?&cat_id=&frm=NVSHATC&',
        query: 'query',
        name: '네이버 쇼핑',
    },
    {
        url: 'https://www.youtube.com/results?',
        query: 'search_query',
        name: '유튜브',
    },
    {
        url: 'https://section.blog.naver.com/Search/Post.naver?pageNo=1&rangeType=ALL&orderBy=sim&',
        query: 'keyword',
        name: '네이버 블로그',
    },
    {
        url: 'https://www.10000recipe.com/recipe/list.html?',
        query: 'q',
        name: '만개의 레시피',
    },
];

const BottomSheet = ({ setIsOpen, clickedTag }) => {
    const [isOpenModal, setIsOpenModal] = useState(true);

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
                    />
                ) : null}
            </AnimatePresence>
        </Background>
    );
};

export default BottomSheet;
