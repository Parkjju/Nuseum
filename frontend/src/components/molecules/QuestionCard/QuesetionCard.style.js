import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Box = styled(Link)`
    height: 50px;
    width: 80%;
    border-bottom: 1px solid rgba(127, 140, 141, 0.5);
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    &:hover {
        opacity: 0.6;
        transition: 0.2s linear;
    }
    text-decoration: none;
    color: black;
`;
