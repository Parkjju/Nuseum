import { useLocation } from 'react-router-dom';
import { Name } from '../../atom/Card/styled';
import Container from '../../atom/Container';
import { Contents } from '../Home/styled';
import { DiaryTitle } from '../Record/styled';

const AdminDetail = () => {
    const location = useLocation();

    return (
        <Container>
            <Contents>
                <DiaryTitle>
                    <Name>{location.state}</Name>
                </DiaryTitle>
            </Contents>
        </Container>
    );
};

export default AdminDetail;
