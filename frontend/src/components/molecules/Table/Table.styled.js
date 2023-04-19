import styled from 'styled-components';

export const CurationMeal = styled.p`
    width: 100%;
    text-align: center;
    padding: 5px 0;
    font-size: ${(props) => `${10 + (props.numberOfCurated - 1) * 0}px`};
    color: ${(props) => (props.notCurated || props.nutCurated ? '#ababab' : 'black')};
    white-space: pre-line;
    line-height: 1.1;
    &:hover {
        opacity: 0.6;
        cursor: pointer;
    }
`;

export const CurationTd = styled.td`
    background-color: ${(props) =>
        props.children && props.children[0].props.notCurated
            ? '#F0F0F0'
            : null
        };
    background-color: ${(props) =>
            props.children && props.children[0].props.nutCurated
                ? '#FAFAFA'
                : null
        };
`;

// 음식, 가공식품, 보충제
export const CurationWith = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 500px;
    text-align: center;
    margin-bottom: 70px;
    ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 70vh;
        overflow-y:scroll;
        width: 95%;
        font-size: 13px;
        justify-content: flex-start;
        @media all and (min-width: 550px) {
            ::-webkit-scrollbar {
                display: none;
            }
        }
    }
    li{
        margin: 5px 0;
        padding: 5px 10px 5px 15px;
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        background: #fafafa;
        border-radius: 10px;
        span{
            text-align: left;
        }
        span:nth-child(2){
            padding-bottom: 5px;
        }
    }
`
