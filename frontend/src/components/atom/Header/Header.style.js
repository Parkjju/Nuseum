import styled from 'styled-components';

export const HeaderBox = styled.div`
    height: 50px;
    max-width: 800px;
    position: absolute;
    width: 100vw;
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
    color: ${(props) => (props.active ? '#000000' : 'rgb(127,140,141)')};
`;
