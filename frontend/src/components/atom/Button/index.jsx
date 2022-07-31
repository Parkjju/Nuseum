import Btn from './styled';
function Button({ text, openModal }) {
    return (
        <>
            {openModal ? (
                <Btn onClick={openModal}>{text}</Btn>
            ) : (
                <Btn>{text}</Btn>
            )}
        </>
    );
}

export default Button;
