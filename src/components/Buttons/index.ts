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
    position: relative;
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

export const IconButton = styled.button<{ size?: number, hoverColor?: string, fontColor?: string }>`
    cursor: pointer;
    color: ${props => props.fontColor || '#FFF'};
    width: ${props => '35px' || props.size};
    height: ${props => '35px' || props.size};
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transition: all .2s;
    background-color: ${props => props.hoverColor || props.theme.colors.black};

    :hover{
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    :active{
        transform: translateY(-1px);
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    ::after{
        content: "";
        display: inline-block;
        height: 100%;
        width: 100%;
        border-radius: 100px;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        transition: all .4s;
        background-color: ${props => props.hoverColor || props.theme.colors.black};
    }

    :hover::after {
        transform: scaleX(1.6) scaleY(1.6);
        opacity: 0;
    }
`;