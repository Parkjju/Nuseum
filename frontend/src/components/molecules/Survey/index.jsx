import Option from '../../atom/Option';
import { QuestionBody, QuestionBox, QuestionHeader } from './styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

function Survey({ description, question }) {
    const [isClick, setIsClick] = useState(false);
    const onClick = () => {
        setIsClick((prev) => !prev);
    };
    return (
        <>
            <AnimatePresence>
                {isClick ? null : (
                    <QuestionBox
                        as={motion.div}
                        initial={{ x: 500 }}
                        animate={{ x: 0 }}
                        exit={{ x: -500 }}
                        transition={{
                            velocity: 1,
                        }}
                    >
                        <QuestionHeader>{description}</QuestionHeader>
                        <QuestionBody>
                            <Option onClick={() => onClick()}></Option>
                            <Option onClick={() => onClick()}></Option>
                            <Option onClick={() => onClick()}></Option>
                            <Option onClick={() => onClick()}></Option>
                            <Option onClick={() => onClick()}></Option>
                        </QuestionBody>
                    </QuestionBox>
                )}
            </AnimatePresence>
        </>
    );
}

export default Survey;
