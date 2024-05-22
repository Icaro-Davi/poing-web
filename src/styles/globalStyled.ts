import { createGlobalStyle } from "styled-components";
import fonts from "./fonts";
import { GridMediaQuery } from "./mediaQuery";

const GlobalStyled = createGlobalStyle`
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        ::-webkit-scrollbar {
            width: 5px;
        }
        ::-webkit-scrollbar-thumb{
            background-color: ${props => props.theme.colors.black};
            border: .5px solid ${props => props.theme.colors.primary};
            border-radius: 5px;
        }
    }

    #__next {
        width: 100%;
        height: 100dvh;
        font-family: 'Roboto', sans-serif;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    ${fonts}
    ${GridMediaQuery}
`;

export default GlobalStyled;
