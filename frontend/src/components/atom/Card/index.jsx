import { Box, Icon, Name, Tab } from './styled';
import diary from '../../../assets/diary.png';
import report from '../../../assets/report.png';
import survey from '../../../assets/survey.png';
import agreement from '../../../assets/agreement.png';
import { Link } from 'react-router-dom';

function Card() {
    return (
        <Box>
            <Link to='/'>
                <Tab>
                    <Icon src={diary} />
                    <Name>먹은것 다이어리</Name>
                </Tab>
            </Link>
            <Link to='/'>
                <Tab>
                    <Icon src={report} />
                    <Name>분석 결과</Name>
                </Tab>
            </Link>
            <Link to='/survey'>
                <Tab>
                    <Icon src={survey} />
                    <Name>영양 & 식생활 진단</Name>
                </Tab>
            </Link>
            <Link to='/'>
                <Tab>
                    <Icon src={agreement} />
                    <Name>참여자 동의서</Name>
                </Tab>
            </Link>
        </Box>
    );
}
export default Card;
