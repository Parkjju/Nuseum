import { useLocation } from 'react-router-dom';
import { Name } from '../../atom/Card/styled';
import Container from '../../atom/Container';
import { Contents } from '../Home/styled';

const NotFound = () => {
    const location = useLocation();

    return location.pathname === '/food' ? (
        <Container>
            <Contents>
                <Name
                    style={{
                        width: '60%',
                        lineHeight: 1.5,
                        textAlign: 'center',
                    }}
                >
                    내 아이를 위해 큐레이션 된 맞춤식품 리스트를 제공해 드릴
                    예정입니다.
                </Name>
            </Contents>
        </Container>
    ) : location.pathname === '/record' ? (
        <Container>
            <Contents>
                <Name
                    style={{
                        width: '60%',
                        lineHeight: 1.5,
                        textAlign: 'center',
                    }}
                >
                    아이의 영양지수 및 건강관련 데이터를 제공해 드릴 예정입니다.
                </Name>
            </Contents>
        </Container>
    ) : null;
};

export default NotFound;
