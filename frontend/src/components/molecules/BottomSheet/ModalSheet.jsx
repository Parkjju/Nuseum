import { useIsPresent } from 'framer-motion';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    CloseButton,
    Modal,
    TagName,
    URL,
    URLBox,
    URLName,
} from './BottomSheet.styled';

const ModalSheet = ({ clickedTag, urlList, setIsOpen, setIsOpenModal }) => {
    const isPresent = useIsPresent();
    const lang = useSelector((state) => state.language.isKorean);

    useEffect(() => {
        if (!isPresent) {
            setTimeout(() => setIsOpen(false), 500);
        }
    }, [isPresent]);

    return (
        <Modal
            initial={{
                y: 500,
            }}
            transition={{
                duration: 0.5,
            }}
            exit={{
                y: 500,
            }}
            animate={{ y: 0 }}
            onClick={(e) => e.stopPropagation()}
        >
            <TagName>{clickedTag}</TagName>
            {urlList.map((item) => (
                <URLBox key={item.name}>
                    <URLName>{item.name}</URLName>
                    <URL
                        target='_blank'
                        href={`${item.url}${item.query}=${clickedTag}`}
                    >
                        {lang ? 'Go to' : '바로가기'}
                    </URL>
                </URLBox>
            ))}
            <CloseButton onClick={() => setIsOpenModal(false)}>
                {lang ? 'Close' : '닫기'}
            </CloseButton>
        </Modal>
    );
};

export default ModalSheet;
