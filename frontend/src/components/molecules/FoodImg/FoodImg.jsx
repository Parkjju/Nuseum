import { Img, Remove } from '../../pages/Record/styled';
import { motion } from 'framer-motion';
import React from 'react';

const FoodImg = ({ data, removeFunction, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
                velocity: 1,
            }}
            style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignContent: 'space-between',
            }}
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
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    height: 'auto',
                }}
            >
                {typeof data === 'object' ? (
                    <Img
                        src={URL.createObjectURL(data)}
                        alt='img'
                        style={{
                            width: '200px',
                        }}
                    />
                ) : typeof data === 'string' && data.length > 1 ? (
                    <Img
                        src={
                            typeof data === 'object'
                                ? URL.createObjectURL(data)
                                : data
                        }
                        alt='img'
                        style={{
                            width: '200px',
                        }}
                    />
                ) : null}
            </div>
        </motion.div>
    );
};

export default React.memo(FoodImg);
