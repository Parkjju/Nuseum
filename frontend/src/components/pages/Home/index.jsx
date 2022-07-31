import Title from '../../atom/Title';
import { Contents, Logo } from './styled';
import logo from '../../../assets/logo.jpeg';

function Home() {
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
