import styled, { keyframes } from "styled-components";

const PADDING = '1rem';

const Slide = keyframes`
    from {
        transform: translateY(-15px);
        opacity: 0;
    }
`;

export const StyledModalCommandCardContainer = styled.div`
    background-color: ${props => props.theme.colors.white};
    width: 100%;
    height: 100%;
    border-radius: 12px;
    padding: 1rem;

    transform: translateY(0);
    opacity: 1;
    animation: ${Slide} .3s linear;
`;

export const StyledModalCommandCardHeader = styled.nav`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 1rem 0;
`;

export const StyledModalCommandCardSection = styled.section`
    min-height: 200px;
    width: 100%;
    padding: ${PADDING} 0 0 0;
    border-top: 1px solid ${props => props.theme.colors.gray};
`;

export const StyledModalCommandCardFooter = styled.footer`
    padding: ${PADDING} 0 0 0;
`;