import { Img, Remove } from '../../pages/Record/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { Image, ImageBox } from '../../pages/Today/Today.style';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useActions from '../../../hooks/useActions';

const FoodImg = ({ data }) => {
    console.log(data);
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
                    onClick={() => {
                        dispatch(action.removeImage(data.id));
                    }}
                >
                    <span className='material-symbols-outlined'>close</span>
                </Remove>
            )}

            {typeof data === 'object' ? (
                <Image src={URL.createObjectURL(data)} alt='img' />
            ) : typeof data === 'string' && data.length > 1 ? (
                <Image
                    src={
                        typeof data === 'object'
                            ? URL.createObjectURL(data)
                            : data
                    }
                    alt='img'
                />
            ) : null}
        </ImageBox>
    );
};

export default React.memo(FoodImg);
