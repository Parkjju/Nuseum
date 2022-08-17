import styled from 'styled-components';

export const HeaderBox = styled.div`
    height: 50px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding-left: 30px;
    display: flex;
    align-items: center;
`;
export const Icon = styled.span`
    cursor: ${(props) => (props.active ? 'pointer' : 'default')};
    user-select: none;
    margin-right: 30px;
    transition: 0.1s linear;
    color: ${(props) => (props.active ? '#000000' : 'rgb(127,140,141)')};
`;
