import { Box, Icon, Name, Tab } from './styled';
import analysis from '../../../assets/analysis.png';
import diary from '../../../assets/notepad.png';
import food from '../../../assets/food.png';
import record from '../../../assets/record.png';
import { Link } from 'react-router-dom';

function Card() {
    return (
        <Box>
            <Link to='/'>
                <Tab>
                    <Icon src={diary} />
                    <Name>식단일기</Name>
                </Tab>
            </Link>
            <Link to='/'>
                <Tab>
                    <Icon src={analysis} />
                    <Name>식이분석</Name>
                </Tab>
            </Link>
            <Link to='/'>
                <Tab>
                    <Icon src={food} />
                    <Name>맞춤식품</Name>
                </Tab>
            </Link>
            <Link to='/'>
                <Tab>
                    <Icon src={record} />
                    <Name>내 아이</Name>
                </Tab>
            </Link>
        </Box>
    );
}
export default Card;
