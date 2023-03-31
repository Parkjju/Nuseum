import styled from 'styled-components';

const Btn = styled.button`
    min-width: 200px;
    height: 42px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: white;
    /* background-color: #7f8c8d;*/
             
    background-image: linear-gradient(to right,rgb(19 106 112) 0%,#4a9999 51%,#155f6d 100%);
    margin: 10px;
    padding: 15px 45px;
    text-align: center;
    transition: 0.5s;
    background-size: 200% auto; 
    box-shadow: 0 0 20px #eee;

     
    border: none;
    cursor: pointer;

    :hover{
        background-position: right center; /* change the direction of the change here */
        color: #fff;
        text-decoration: none;
    }
`;

export default Btn;
