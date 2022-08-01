import { Box, Icon, Name, Tab } from './styled';
import diary from '../../../assets/diary.png';
import report from '../../../assets/report.png';
import survey from '../../../assets/survey.png';
import agreement from '../../../assets/agreement.png';

function Card() {
    return (
        <Box>
            <Tab>
                <Icon src={diary} />
                <Name>먹은것 다이어리</Name>
            </Tab>
            <Tab>
                <Icon src={report} />
                <Name>분석 결과</Name>
            </Tab>
            <Tab>
                <Icon src={survey} />
                <Name>영양 & 식생활 진단</Name>
            </Tab>
            <Tab>
                <Icon src={agreement} />
                <Name>참여자 동의서</Name>
            </Tab>
        </Box>
    );
}
export default Card;
