import styled from "styled-components";
import { GUILD_CARD_HEIGHT } from "../../Card/Guild/styles";

const QUANTITY_OF_GUILD_CARDS_IN_SCROLL = 5;

export const ModalContainer = styled.section`
    width: 100%;
    overflow-y: auto;
    height: calc(((${GUILD_CARD_HEIGHT} + .5em)* ${QUANTITY_OF_GUILD_CARDS_IN_SCROLL}) + .5em);
    background-color: ${props => props.theme.colors.black};
    padding: .5em;
    border-radius: 6px;

`;

export const ModalScrollContainer = styled.div`
    width: 100%;

    display: flex;
    row-gap: .5em;

    flex-flow: column;
`;

export const ModalHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;