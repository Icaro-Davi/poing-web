import styled from "styled-components";

const PADDING_MODULE_CARD = .6;

export const ModuleCard = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-flow: column;
    position: relative;
    background-color: ${props => props.theme.colors.primary};
    border-radius: .3rem;
    `;

export const ModuleCardHeader = styled.header`
    position: relative;
    padding: ${PADDING_MODULE_CARD}rem;
    box-shadow: inset 0px -10px 15px -10px ${props => props.theme.colors.black};
    /* ::after {
        content: '';
        position: absolute;
        top: 0%; left: 0;
        background-image: linear-gradient(${props => props.theme.colors.primary} 35%, ${props => props.theme.colors.black});
        width:100%; height: 100%;
        opacity: .3;
    } */
`;

export const ModuleCardSection = styled.section`
    overflow: auto;
    padding: ${PADDING_MODULE_CARD}rem;
    `;

export const ModuleCardFooter = styled.footer`
    padding: ${PADDING_MODULE_CARD}rem;
    position: relative;
    box-shadow: inset 0px 10px 15px -10px ${props => props.theme.colors.black};
    /* ::after {
        content: '';
        position: absolute;
        top: 0%; left: 0;
        background-image: linear-gradient(${props => props.theme.colors.black} 35%, ${props => props.theme.colors.primary});
        width:100%; height: 100%;
        opacity: .3;
    } */
`;