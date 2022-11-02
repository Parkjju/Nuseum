import { useIsPresent } from 'framer-motion';
import { useEffect } from 'react';
import { Modal, TagName, URL, URLBox, URLName } from './BottomSheet.styled';

const ModalSheet = ({ clickedTag, urlList, setIsOpen }) => {
    const isPresent = useIsPresent();

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
                        href={`${item.url}${item.query}=${clickedTag.slice(1)}`}
                    >
                        바로가기
                    </URL>
                </URLBox>
            ))}
        </Modal>
    );
};

export default ModalSheet;
