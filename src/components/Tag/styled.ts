import styled, { css, keyframes } from "styled-components";
import { TagProps } from "./index.types";

const RainbowColors = '#488cfb, #29dbbc, #ddf505, #ff9f0e, #e440bb, #655adc, #488cfb';

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

export const Tag = styled.span<TagProps>`
    background-color: ${props => props.theme.colors.white};
    padding: .2rem;
    z-index: 5;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 0 2px #FFF,0 0 5px #FFF,0 0 9px  #FFF;

    ::before {
        ${pseudoElement}
        padding: .3rem;
        background: conic-gradient(${RainbowColors});
        background-size: 100%;
        animation: ${blurAnimation(2)} 3s linear infinite;
    }

    ::after {
        ${pseudoElement}
        padding: .4rem;
        opacity: 0.5;
        background: conic-gradient(${RainbowColors});
        animation: ${blurAnimation(5)} 3s linear infinite;
    }
`;