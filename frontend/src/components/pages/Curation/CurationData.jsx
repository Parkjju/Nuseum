import {
    CurationBox,
    CurationFood,
    CurationFoodList,
    CurationFoodTitle,
    CurationType,
    CurationTypeImage,
    CurationTypeName,
} from './Curation.styled';

import bean from '../../../assets/curation/bean.png';
import meat from '../../../assets/curation/meat.png';
import milk from '../../../assets/curation/milk.png';
import mushroom from '../../../assets/curation/mushroom.png';
import nut from '../../../assets/curation/nut.png';
import processed from '../../../assets/curation/processed.png';
import rice from '../../../assets/curation/rice.png';
import seeweed from '../../../assets/curation/seeweed.png';
import strawberry from '../../../assets/curation/strawberry.png';
import supplement from '../../../assets/curation/supplement.png';
import vegetable from '../../../assets/curation/vegetable.png';
import avoid from '../../../assets/curation/avoid.png';

const images = {
    '콩/두부': bean,
    '고기/생선/달걀': meat,
    유제품: milk,
    버섯: mushroom,
    견과: nut,
    '가공 식품': processed,
    통곡물: rice,
    해조류: seeweed,
    과일: strawberry,
    영양제: supplement,
    채소: vegetable,
    주의: avoid,
};
const CurationData = ({ data }) => {
    return (
        <CurationBox>
            <CurationType>
                {images[data.type] ? (
                    <CurationTypeImage
                        src={images[data.type]}
                        alt={`${data.image}`}
                    />
                ) : null}
                <CurationTypeName>
                    {data.type === '주의' ? '피해야할 식품' : data.type}
                </CurationTypeName>
            </CurationType>
            <CurationFood>
                <CurationFoodTitle>{data.main}</CurationFoodTitle>
                <CurationFoodList>
                    {data.list.map((item, index) => (
                        <span key={index}>{item}</span>
                    ))}
                </CurationFoodList>
            </CurationFood>
        </CurationBox>
    );
};

export default CurationData;
