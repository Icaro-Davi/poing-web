import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
    100%{
        transform: rotate(360deg);
    }
`;

const dashAnimation = keyframes`
    0%{
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 90,200;
        stroke-dashoffset: -35px;
    }
    100% {
        stroke-dashoffset: -125px;
    }
`;

export const LoaderContainer = styled.div`
    position: relative;
    ::before{
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #FFFFFFBB;
        z-index: 5;
    }
`;

export const LoadIconContainer = styled.div<{ loaderColor?: string }>`
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 3.25em;
        transform-origin: center;
        animation: ${rotateAnimation} 2s linear infinite;
        circle {
            fill: none;
            stroke: ${props => props.color || props.theme.colors.secondary};
            stroke-width: 2;
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
            stroke-linecap: round;
            animation: ${dashAnimation} 1.5s ease-in-out infinite;
        }
    }
`;