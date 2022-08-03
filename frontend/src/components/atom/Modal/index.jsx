import {
    Container,
    Modal,
    ModalBtn,
    ModalDescription,
    ModalTitle,
} from './styled';

function ErrorModal({ message, open, closeModal }) {
    return (
        <>
            {open ? (
                <Container>
                    <Modal>
                        <ModalTitle>{message}</ModalTitle>
                        <ModalDescription>다시 입력해주세요!</ModalDescription>
                        <ModalBtn onClick={closeModal}>확인</ModalBtn>
                    </Modal>
                </Container>
            ) : null}
        </>
    );
}

export default ErrorModal;
