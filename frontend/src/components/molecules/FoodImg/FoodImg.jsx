import { Img, Remove } from '../../pages/Record/styled';
import { motion } from 'framer-motion';
import React from 'react';
import { Image, ImageBox } from '../../pages/Today/Today.style';

const FoodImg = ({ data, removeFunction, index }) => {
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
                        return removeFunction(index);
                    }}
                >
                    <span className='material-symbols-outlined'>close</span>
                </Remove>
            )}

            {typeof data === 'object' ? (
                <Image
                    style={{ height: '200px' }}
                    src={URL.createObjectURL(data)}
                    alt='img'
                />
            ) : typeof data === 'string' && data.length > 1 ? (
                <Image
                    style={{ height: '200px' }}
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
