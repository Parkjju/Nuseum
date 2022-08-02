import Text, { TextBox } from './styled';

function Title({ text }) {
    return (
        <TextBox>
            <Text>{text}</Text>
        </TextBox>
    );
}

export default Title;
