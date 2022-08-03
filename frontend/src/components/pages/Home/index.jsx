import { Contents } from './styled';
import Card from '../../atom/Card';
import Container from '../../atom/Container';

import diary from '../../../assets/notepad.png';
import record from '../../../assets/record.png';
import analysis from '../../../assets/analysis.png';
import food from '../../../assets/food.png';
import question from '../../../assets/q&a.png';

function Home() {
    const menu = [
        [diary, '식단일기', 'diary'],
        [analysis, '식이분석', 'analysis'],
        [food, '맞춤식품', 'food'],
        [record, '내 아이', 'record'],
        [question, 'Q&A', 'question'],
    ];

    return (
        <Container>
            <Contents>
                <Card menu={menu} current='home' />
            </Contents>
        </Container>
    );
}

export default Home;
