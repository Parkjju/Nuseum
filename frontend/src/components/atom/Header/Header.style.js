import styled from 'styled-components';

export const HeaderBox = styled.div`
    height: 50px;
    max-width: 800px;
    width: 100vw;
    margin: auto;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const Icon = styled.span`
    cursor: ${(props) => (props.active ? 'pointer' : 'default')};
    user-select: none;
    transition: 0.1s linear;
    color: black;
`;
