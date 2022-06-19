import styled, { keyframes } from "styled-components";

const ButtonShiningAnimation = keyframes`
    0% {
        background-position: 0%;
    }
    100% {
        background-position: 400%;
    }
`;

const ButtonShiningColors = '#8B8BAE, #88D9E6, #C5FFFD, #8B8BAE';

export const ButtonShining = styled.button`
    text-decoration: none;
    position: absolute;
    border: none;
    font-size: 14px;
    color: ${props => props.theme.colors.white};
    font-weight: bold;
    min-width: 9em;
    padding: 0 1rem;
    height: 3em;
    line-height: 2em;
    text-align: center;
    background: linear-gradient(90deg, ${ButtonShiningColors});
    background-size: 300%;
    border-radius: 30px;
    z-index: 1;
    cursor: pointer;

    :hover {
        animation: ${ButtonShiningAnimation} 8s linear infinite;
        border: none;
    }

    ::before {
        content: '';
        position: absolute;
        top: -5px;
        left: -5px;
        right: -5px;
        bottom: -5px;
        z-index: -1;
        background: linear-gradient(90deg,  ${ButtonShiningColors});
        background-size: 400%;
        border-radius: 35px;
        transition: 1s;
    }

    :hover::before {
        filter: blur(20px);
    }

    :active {
        background: linear-gradient(32deg, ${ButtonShiningColors});
    }
`;