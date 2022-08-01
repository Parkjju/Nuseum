import Title from '../../atom/Title';
import { Contents, Logo } from './styled';
import logo from '../../../assets/logo.jpeg';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { token } from '../../../recoil/token/token';

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
        <>
            <Title text='Home' />;
            <Contents>
                <Logo src={logo} />
            </Contents>
        </>
    );
}

export default Home;
