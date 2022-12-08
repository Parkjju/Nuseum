import { useSelector } from 'react-redux';
import {
    Container,
    Modal,
    ModalBtn,
    ModalDescription,
    ModalTitle,
} from './styled';

function ErrorModal({ message, open, closeModal }) {
    const lang = useSelector((state) => state.language.isKorean);
    return (
        <>
            {open ? (
                <Container>
                    <Modal>
                        <ModalTitle>{message}</ModalTitle>
                        <ModalDescription>
                            {lang
                                ? 'Please enter it again!'
                                : '다시 입력해주세요!'}
                        </ModalDescription>
                        <ModalBtn onClick={closeModal}>확인</ModalBtn>
                    </Modal>
                </Container>
            ) : null}
        </>
    );
}

export default ErrorModal;
