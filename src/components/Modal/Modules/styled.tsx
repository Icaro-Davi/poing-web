import styled from "styled-components";
import CloseButton from "../../Buttons/IconsButton/Close";
import { Title } from "../../Typography";

import type { FC, ReactNode } from "react";

const PADDING_MODULE_CARD = .6;

export const ModuleCard = styled.div`
    width: 100%;
    min-height: 30vh;
    max-height: 80vh;
    display: flex;
    flex-flow: column;
    position: relative;
    background-color: ${props => props.theme.colors.primary};
    border-radius: .3rem;
    overflow: hidden;
`;

const _ModuleCardHeader = styled.header`
    position: relative;
    padding: ${PADDING_MODULE_CARD}rem;
    box-shadow: inset 0px -10px 15px -10px ${props => props.theme.colors.black};
    background-color: ${props => props.theme.colors.white};
    display: flex;
    flex-flow: column;

    .nav-modal  {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: .6rem;
    }
`;

export const ModuleCardSection = styled.section`
    padding: ${PADDING_MODULE_CARD}rem;
    min-height: 500px;
`;

export const ModuleCardFooter = styled.footer`
    padding: ${PADDING_MODULE_CARD}rem;
    position: relative;
    box-shadow: inset 0px 10px 15px -10px ${props => props.theme.colors.black};
`;

export const ModuleCardHeader: FC<{ title: string; onClose?: () => void; children?: ReactNode }> = props => (
    <_ModuleCardHeader>
        <div className="nav-modal">
            <Title level="3" stroke={{ strokeColor: '#000' }} font='Roboto' style={{ fontWeight: 600 }}>{props.title}</Title>
            <CloseButton onClick={props.onClose} />
        </div>
        {props.children}
    </_ModuleCardHeader>
);
