import styled, { css, keyframes } from "styled-components";

const SLIDE_ANIMATION = keyframes`
    from {
        left: -100%;
    }
    to {
        left: 0;
    }
`;

const FADE_IN_ANIMATION = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const ListContainer = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    list-style: none;
    row-gap: .3rem;
    overflow: auto;
    animation: ${FADE_IN_ANIMATION} 2s ease-in;
`;

export const ListItem = styled.li<{ isActive: boolean; }>`
    background-color: ${props => props.theme.colors.white};
    width: 100%;
    padding: .8rem;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    border: 2px solid ${props => props.theme.colors.white};
    animation: ${SLIDE_ANIMATION} 200ms ease-in-out;

    h4 {
        width: 100%;
    }

    span {
        position: relative;
        z-index: 1;
        display: inline-block;
        max-width: 80%;
    }


    ${props => {
        return props.isActive
            ? css`
                cursor: pointer;
                span::after {
                    content: '';
                    position: absolute;
                    z-index: -1;
                    left: -140%;
                    width: 100%;
                    height: 100%;
                    background-color: ${props.theme.colors.gray};
                    transform: scaleY(4) scaleX(1.2) skewX(-30deg);
                    transition: left 200ms ease-in-out, transform 50ms ease-in-out, background-color 200ms linear;
                    box-shadow: -3px 0 10px 1px black;
                }
                :hover span::after {
                    left: -10px;
                }

                :active span::after {
                    left: -10px;
                    background-color: ${props.theme.colors.primary};
                }
         `
            : '';
    }}

`;

