import styled from 'styled-components';
import React from 'react';
const ImageBox = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 50px;
`;

export default React.memo(ImageBox);
