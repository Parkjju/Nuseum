import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { periodState } from '../../../recoil/period/period';
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from '../../../store/meal-slice/post-slice';

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
    color: #7f8c8d;
    width: 90px;
    padding: 0 10px;
    &:focus {
        outline: none;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    border: none;
    border-bottom: 1px solid #9a9a9a;
`;
const Adornment = styled.span`
    color: #7f8c8d;
    position: absolute;
    right: -15px;
    top: 8px;
`;

const NutritionList = ({ item }) => {
    const param = useParams();
    const dispatch = useDispatch();

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
            dispatch(
                postActions.addPostData({
                    name: e.target.name,
                    food: Number(e.target.getAttribute('data-itemID')),
                    amount: Number(amount),
                })
            );

            setAmount(0);
        }
    };

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

    const renderNutrition = (param) => {
        switch (param) {
            case 'carbohydrate':
                return ['탄수화물', 'g'];
            case 'dha_epa':
                return ['DHA+EPA', '㎎'];
            case 'dietary_fiber':
                return ['식이섬유', 'g'];
            case 'energy':
                return ['에너지', '㎉'];
            case 'fat':
                return ['지방', 'g'];
            case 'folic_acid':
                return ['엽산', '㎍'];
            case 'magnesium':
                return ['마그네슘', '㎎'];
            case 'protein':
                return ['단백질', 'g'];
            case 'tryptophan':
                return ['트립토판', '㎎'];
            case 'vitamin_a':
                return ['비타민 A', '㎍'];
            case 'vitamin_b6':
                return ['비타민 B6', '㎎'];
            case 'vitamin_b12':
                return ['비타민 B12', '㎍'];
            case 'vitamin_d':
                return ['비타민 D', '㎍'];
            default:
                return null;
        }
    };

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
                alignItems: 'flex-end',
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
                            {renderNutrition(elem[0])[0]} :{' '}
                            {`${elem[1]}${renderNutrition(elem[0])[1]}`}
                        </p>
                    )
                )}
            </div>
            <InputAmountBox>
                <InputAmount
                    name={item.name}
                    data-itemID={item.id}
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
