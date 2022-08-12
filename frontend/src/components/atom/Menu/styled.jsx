import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { periodState } from '../../../recoil/period/period';

export const ResultBox = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Result = styled(motion.p)`
    width: 90%;
    font-size: 12px;
    text-align: left;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    line-height: 16px;
    margin-bottom: 10px;
    border-radius: 10px;
`;
export const Divider = styled(motion.hr)`
    width: 100%;
`;
const InputAmountBox = styled.div`
    width: 90px;
    position: relative;
    right: 20px;
`;
const InputAmount = styled.input`
    height: 30px;
    width: 90px;
    padding: 0 10px;
    &:focus {
        outline: none;
        box-shadow: 0 0 0 1px #7f8c8d;
        transition: 0.1s linear;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
const Adornment = styled.span`
    color: #7f8c8d;
    position: absolute;
    right: -15px;
    top: 8px;
`;

const NutritionList = ({ item }) => {
    const param = useParams();
    const [period, setPeriod] = useRecoilState(periodState);
    const [amount, setAmount] = useState(0);

    const onChange = (e) => {
        if (e.target.value.toString().length > 5) {
            return;
        } else {
            setAmount(e.target.value);
        }
    };

    const saveNutrition = (e) => {
        if (e.which === 13) {
            switch (param.when) {
                case 'breakfast':
                    setPeriod((prev) => {
                        const previousMeal = [...prev.breakfast];
                        const newFood = [e.target.name, amount];
                        return {
                            ...prev,
                            breakfast: [...previousMeal, newFood],
                        };
                    });
                    break;
                case 'lunch':
                    setPeriod((prev) => {
                        const previousMeal = [...prev.lunch];
                        const newFood = [e.target.name, amount];
                        return {
                            ...prev,
                            lunch: [...previousMeal, newFood],
                        };
                    });
                    break;
                case 'dinner':
                    setPeriod((prev) => {
                        const previousMeal = [...prev.dinner];
                        const newFood = [e.target.name, amount];
                        return {
                            ...prev,
                            dinner: [...previousMeal, newFood],
                        };
                    });
                    break;
                case 'snack':
                    setPeriod((prev) => {
                        const previousMeal = [...prev.snack];
                        const newFood = [e.target.name, amount];
                        return {
                            ...prev,
                            snack: [...previousMeal, newFood],
                        };
                    });
                    break;
                case 'drug':
                    break;
                default:
                    break;
            }
            setAmount(0);
        }
    };
    console.log(period);

    const [keyCount, setKeyCount] = useState(0);

    useEffect(() => {
        setKeyCount(0);
        Object.entries(item).forEach((elem) =>
            elem[1] === 0 ||
            elem[0] === 'open' ||
            elem[0] === 'id' ||
            elem[0] === 'category' ||
            elem[0] === 'name'
                ? null
                : setKeyCount((prev) => prev + 1)
        );
    }, []);

    return (
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 16 * keyCount, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
                duration: 0.5,
            }}
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <div>
                {Object.entries(item).map((elem, index) =>
                    elem[1] === 0 ||
                    elem[0] === 'open' ||
                    elem[0] === 'id' ||
                    elem[0] === 'category' ||
                    elem[0] === 'name' ||
                    elem[0] === 'classifier' ? null : (
                        <p key={index}>
                            {elem[0]} : {elem[1]}
                        </p>
                    )
                )}
            </div>
            <InputAmountBox>
                <InputAmount
                    name={item.id}
                    onChange={onChange}
                    value={amount}
                    maxLength='5'
                    type='number'
                    onKeyDown={saveNutrition}
                />
                <Adornment>g 또는 ml</Adornment>
            </InputAmountBox>
        </motion.div>
    );
};

export const Nutrition = ({ item, open }) => {
    return (
        <AnimatePresence>
            {open ? (
                <>
                    <NutritionList item={item} />
                </>
            ) : null}
        </AnimatePresence>
    );
};
