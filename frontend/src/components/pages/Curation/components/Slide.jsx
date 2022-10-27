import { motion, AnimatePresence } from 'framer-motion';
import {
    CommentBox,
    CurationDataWrapper,
    CurationTypeImage,
    Title,
    WarningBox,
    WarningFood,
    WarningList,
    WarningMain,
    WarningTitle,
} from '../Curation.styled';
import CurationData from '../CurationData';
import avoid from '../../../../assets/curation/avoid.png';
import { useEffect } from 'react';

const Slide = ({
    recommendData,
    recommendDataInfo,
    setRecommend,
    setCurrentRecommendIndex,
}) => {
    return (
        <motion.div
            style={{
                width: '100%',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            drag='x'
            dragSnapToOrigin
            onDragEnd={(event, info) => {
                if (info.offset.x < -100) {
                    setCurrentRecommendIndex((prev) => prev - 1);
                } else if (info.offset.x > 100) {
                    setCurrentRecommendIndex((prev) => prev + 1);
                } else {
                    console.log('no change');
                }
            }}
        >
            <Title>22.10.16</Title>
            <Title>피해야 할 식품</Title>
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

            <Title>내 아이 맞춤식품</Title>
            <CurationDataWrapper rows={recommendData?.data.length / 2}>
                {recommendData?.data.map((item, index) => (
                    <CurationData data={item} key={index} />
                ))}
            </CurationDataWrapper>

            <CommentBox>{recommendData?.comment}</CommentBox>
        </motion.div>
    );
};

export default Slide;
