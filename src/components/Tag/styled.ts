import styled, { css, keyframes } from "styled-components";
import { TagProps } from "./index.types";

const RainbowColors = '#488cfb, #29dbbc, #ddf505, #ff9f0e, #e440bb, #655adc, #488cfb';
const Moderation = '#7d0094 100%, #00ddC0 100%';
const utility = '#5FD3A9 100%, #9DE365 100%';

const blurAnimation = (blur: number) => keyframes`
    0% {
        filter: hue-rotate(0turn) blur(${blur}px);
    }
    100% {
        filter: hue-rotate(1turn) blur(${blur}px);
    }
`;

const pseudoElement = css`
        content: '';
        position: absolute;
        top: 50%; left: 50%;
        transform: translateY(-50%) translateX(-50%);
        width: 100%; height: 100%;
        z-index: -1;
        border-radius: 5px;
`;

const generateBorder = (colors: string) => css`
    ::before {
        ${pseudoElement}
        padding: .3rem;
        background: conic-gradient(${colors});
        background-size: 100%;
        animation: ${blurAnimation(2)} 1s linear infinite;
    }
    ::after {
        ${pseudoElement}
        padding: .4rem;
        opacity: 0.5;
        background: conic-gradient(${colors});
        animation: ${blurAnimation(5)} 1s linear infinite;
    }
`;

export const Tag = styled.span<TagProps>`
    background-color: ${props => props.theme.colors.white};
    padding: .2rem;
    z-index: 5;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 0 2px #FFF,0 0 5px #FFF,0 0 9px  #FFF;
    margin: .4rem;

    font-weight: ${props => props.weight === 'bold' ? 'bold' : 'normal'};
    ${props => {
        switch (props.borderTheme) {
            case 'admin':
                return generateBorder(RainbowColors);
            case 'moderation':
                return generateBorder(Moderation);
            case 'utility':
                return generateBorder(utility);
        }
    }}
`;