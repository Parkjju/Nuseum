import { Img, Remove } from '../../pages/Record/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { Image, ImageBox } from '../../pages/Today/Today.style';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useActions from '../../../hooks/useActions';
import axios from 'axios';
import { postActions } from '../../../store/meal-slice/post-slice';

const FoodImg = ({ data, index, isPost }) => {
    const dispatch = useDispatch();

    const params = useParams();
    const action = useActions(params.when);

    return (
        <ImageBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                velocity: 1,
            }}
            as={motion.div}
            style={{ backgroundColor: 'transparent' }}
        >
            {data === '' ? null : (
                <Remove
                    onClick={async () => {
                        if (window.confirm('등록한 사진을 삭제하시겠어요?')) {
                            if (!isPost) {
                                try {
                                    dispatch(action.removeImage(data.id));
                                    await axios.delete(
                                        `https://nuseum-v2.herokuapp.com/api/v1/consumption/food/image/${data.id}/`
                                    );
                                } catch (err) {
                                    console.log(err);
                                    alert(
                                        '오류가 발생했습니다. 담당자에게 문의해주세요!'
                                    );
                                }
                            } else {
                                dispatch(postActions.removePostimage(index));
                            }
                        }
                    }}
                >
                    <span className='material-symbols-outlined'>close</span>
                </Remove>
            )}

            {data.image ? (
                <Image src={data.image} alt='img' />
            ) : (
                <Image src={data} alt='img' />
            )}
        </ImageBox>
    );
};

export default React.memo(FoodImg);
