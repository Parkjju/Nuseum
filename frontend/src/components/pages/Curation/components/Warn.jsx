import { useSelector } from 'react-redux';
import avoid from '../../../../assets/curation/avoid.png';
import {
    CurationTypeImage,
    Title,
    WarningBox,
    WarningFood,
    WarningList,
    WarningMain,
    WarningTitle,
} from '../Curation.styled';
const Warn = ({ recommendData }) => {
    const lang = useSelector((state) => state.language.isKorean);
    return (
        <>
            <Title>{lang ? 'Food to avoid' : '피해야 할 식품'}</Title>
            <WarningBox>
                <WarningTitle>
                    <CurationTypeImage src={avoid} alt='피해야할 음식' />
                    <WarningMain>
                        {
                            recommendData?.data
                                .filter((item) => item.type === '주의')[0]
                                .main.split('(')[0]
                        }

                        {recommendData?.data
                            .filter((item) => item.type === '주의')[0]
                            .main.split('(')[1]
                            ? `\n(${
                                  recommendData?.data
                                      .filter((item) => item.type === '주의')[0]
                                      .main.split('(')[1]
                              }`
                            : null}
                    </WarningMain>
                </WarningTitle>
                <WarningList>
                    {recommendData?.data
                        .filter((item) => item.type === '주의')[0]
                        .list.map((food, index) => (
                            <WarningFood key={index}>{food}</WarningFood>
                        ))}
                </WarningList>
            </WarningBox>
        </>
    );
};
export default Warn;
