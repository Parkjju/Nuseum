import Title from '../../atom/Title';
import { Contents } from './styled';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { token } from '../../../recoil/token/token';
import Card from '../../atom/Card';
import Container from '../../atom/Container';

function Home() {
    const navigate = useNavigate();
    const tokenValue = useRecoilValue(token);
    useEffect(() => {
        if (!tokenValue) {
            navigate('/login');
            return;
        }
    }, [tokenValue, navigate]);
    return (
        <Container>
            {/* <Title text='HOME' /> */}
            <Contents>
                <Card />
            </Contents>
        </Container>
    );
}

export default Home;
