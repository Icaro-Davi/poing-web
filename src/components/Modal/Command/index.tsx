import { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import Grid from "../../Grid";
import { StyledModalCommandCardContainer, StyledModalCommandWrapper } from "./styled";
import Footer from "./Footer";
import Header from './Header';
import Section from './Section';
import { PickInside } from "../../../utils/general.types";
import { Locale } from "../../../locale/index.type";
import { useRef } from "react";

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
        <StyledModalCommandWrapper onClick={onCloseModal}>
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
        </StyledModalCommandWrapper>
    );
}

export default ModalCommandCard;