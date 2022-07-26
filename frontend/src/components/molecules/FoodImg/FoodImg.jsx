import { Img, Remove } from '../../pages/Record/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { Image, ImageBox } from '../../pages/Today/Today.style';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useActions from '../../../hooks/useActions';
import axios from 'axios';
import { postActions } from '../../../store/meal-slice/post-slice';

const FoodImg = ({ data, index, isPost, setLoading }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const lang = useSelector((state) => state.language.isKorean);

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
                        if (
                            window.confirm(
                                lang
                                    ? 'Do you want to delete the registered photo?'
                                    : '등록한 사진을 삭제하시겠어요?'
                            )
                        ) {
                            if (!isPost) {
                                try {
                                    setLoading(true);
                                    dispatch(action.removeImage(data.id));
                                    await axios.delete(
                                        `/api/v1/consumption/food/image/${data.id}/`,
                                        {
                                            headers: {
                                                Authorization: `Bearer ${token}`,
                                            },
                                        }
                                    );
                                    setLoading(false);
                                    alert(
                                        lang
                                            ? 'Your image has been deleted!'
                                            : '이미지가 삭제되었습니다!'
                                    );
                                } catch (err) {
                                    if (err.response.status === 401) {
                                        setLoading(false);
                                        return;
                                    }
                                    alert(
                                        lang
                                            ? 'An error has occurred. Please contact the developer!'
                                            : '오류가 발생했습니다. 담당자에게 문의해주세요!'
                                    );
                                    setLoading(false);
                                }
                            } else {
                                dispatch(postActions.removePostimage(index));
                                setLoading(false);
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
