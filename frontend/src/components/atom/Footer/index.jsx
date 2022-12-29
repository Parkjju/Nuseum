import { useSelector } from 'react-redux';
import { Box, Content, Text } from './styled';

function Footer() {
    const lang = useSelector((state) => state.language.isKorean);
    return (
        <Box>
            <Content>
                <Text></Text>
                <Text>
                    {lang
                        ? '© 2022 Nuseum. All rights reserved.'
                        : '© 2022 Nuseum. All rights reserved.'}
                </Text>
            </Content>
        </Box>
    );
}
export default Footer;
