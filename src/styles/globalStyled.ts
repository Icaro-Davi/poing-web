import { createGlobalStyle, css } from "styled-components";
import { GridMediaQuery } from "./mediaQuery";

const GlobalStyled = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    #__next {
        width: 100%;
        height: 100vh;
        font-family: 'Roboto', sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ${GridMediaQuery}
`;

export default GlobalStyled;

export const StrokeCss = (options: { color: string, strokeColor: string, shadow?: 'transparent' | string, shadowBlur?: number, strokeSize?: number }) => css`
    color: ${options.color};
    text-shadow:
    -${options?.strokeSize ?? 1}px -${options?.strokeSize ?? 1}px 0 ${options.strokeColor},
    ${options?.strokeSize ?? 1}px -${options?.strokeSize ?? 1}px 0 ${options.strokeColor},
    -${options?.strokeSize ?? 1}px ${options?.strokeSize ?? 1}px 0 ${options.strokeColor},
    ${options?.strokeSize ?? 1}px ${options?.strokeSize ?? 1}px 0 ${options.strokeColor},
    2px 2px ${options?.shadowBlur ?? 5}px ${props => options.shadow || props.theme.colors.black};
`;