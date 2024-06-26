import styled from "styled-components";

export const FLOAT_DEFAULT_SPACING = '.6rem';
export const FLOAT_CUBIC_BEZIER = 'cubic-bezier(.4, 0, .2, 1)';

export const FloatGroup = styled.div`
    position: relative;
    padding:0 .5rem 0 .5rem;

    svg {
        position: absolute;
        color: ${props => props.theme.colors.white};
        margin: ${FLOAT_DEFAULT_SPACING} 0 ${FLOAT_DEFAULT_SPACING} 0;
        right: calc(${FLOAT_DEFAULT_SPACING} * 2);
    }
`;

export const FloatLabel = styled.label<{ error: boolean }>`
    position: absolute;
    left: 15px;
    color: ${props => props.error ? props.theme.colors.error : props.theme.colors.white};
    pointer-events: none;
    transform: translateY(${FLOAT_DEFAULT_SPACING});
    transition: 150ms ${FLOAT_CUBIC_BEZIER};
`;