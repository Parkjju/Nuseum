import { Box, Content, Text } from './styled';

function Footer() {
    return (
        <Box>
            <Content>
                <Text>
                    본 웹/앱툴은 식품의약품안전처의 영양취약계층 맞춤형 영양관리
                    및 정보제공 용역연구수행을 위해 서울대학교 창업지원단,
                    아마존웹서비스/부산CIC의 지원을 받아 개발되었습니다. 섭식에
                    어려움을 겪는 자폐스펙트럼 장애 아동이 개인맞춤영양예측
                    모델에 의해 도움을 받을 수 있는지에 대한 가설을 검증하기
                    위한 탐색적 임상연구 툴입니다.
                </Text>
                <Text>
                    © 2022 서울대학교 영양생리약리연구실. All rights reserved.
                </Text>
            </Content>
        </Box>
    );
}
export default Footer;
