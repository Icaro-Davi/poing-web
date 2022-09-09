import dynamic from 'next/dynamic';
import { useRef } from "react";
import LoadWrapper from '../../Loading/LoadWrapper'
import { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import Grid from "../../Grid";
import { StyledModalCommandCardContainer } from "./styled";
import Footer from "./Footer";
import Header from './Header';
import { ModalWrapper } from "../styled";
const Section = dynamic(() => import('./Section'), {
    loading: () => (
        <LoadWrapper isLoading={true}><div style={{ padding: '1rem' }} /></LoadWrapper>
    )
});

import type { Locale } from "../../../locale/index.type";
import type { PickInside } from "../../../utils/general.types";

interface IModalCommandCard {
    title: string;
    command: PickInside<Locale, 'commands'>;
}

const ModalCommandCard: ModalComponentWrapper<IModalCommandCard> = props => {
    const modalRef = useRef<HTMLDivElement>(null);
    const onCloseModal = () => {
        modalRef.current?.classList.add('modal-out');
        setTimeout(props.modal.close, 300);
    }
    return (
        <ModalWrapper onClick={onCloseModal}>
            <Grid horizontalAlign='center'>
                <Grid.Row breakpoints={{ xl: 10, md: 14, xs: 22 }} onClick={e => (e.stopPropagation())}>
                    <StyledModalCommandCardContainer ref={modalRef}>
                        <Header
                            closeButtonTitle='Fechar'
                            commandName={props.command.name}
                            onClose={onCloseModal}
                        />
                        <Section {...props.command} />
                        <Footer categoryName={props.command.category} />
                    </StyledModalCommandCardContainer>
                </Grid.Row>
            </Grid>
        </ModalWrapper>
    );
}

export default ModalCommandCard;