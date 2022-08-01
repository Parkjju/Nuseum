import { Box, Index, Text } from './styled';

function Option({ onClick }) {
    return (
        <Box onClick={onClick}>
            <Index>1</Index>
            <Text>거의 먹지 않는다</Text>
        </Box>
    );
}

export default Option;
