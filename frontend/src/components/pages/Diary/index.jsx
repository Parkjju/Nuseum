// 식단일기 메뉴
import morning from '../../../assets/morning.png';
import lunch from '../../../assets/lunch.png';
import dinner from '../../../assets/dinner.png';
import cake from '../../../assets/cake.png';
import drug from '../../../assets/drug.png';

import Card from '../../atom/Card';
import { Contents } from '../Home/styled';

function Diary() {
    const menu = [
        [morning, '아침', 'breakfast'],
        [lunch, '점심', 'lunch'],
        [dinner, '저녁', 'dinner'],
        [cake, '간식', 'snack'],
        [drug, '영양제', 'drug'],
    ];

    return (
        <Contents>
            <Card menu={menu} />
        </Contents>
    );
}
export default Diary;
