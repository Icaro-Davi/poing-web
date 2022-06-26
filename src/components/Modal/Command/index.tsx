import { ModalComponentWrapper } from "../../../hooks/useModal/modal.types";
import Grid from "../../Grid";
import { StyledModalCommandCardContainer } from "./styled";
import Footer from "./Footer";
import Header from './Header';
import Section from './Section';

interface IModalCommandCard {
    title: string;
    command: {
        name: string;
        description: string;
    }
}

const ModalCommandCard: ModalComponentWrapper<IModalCommandCard> = props => {
    return (
        <Grid horizontalAlign='center'>
            <Grid.Row breakpoints={{ xl: 8, md: 12, xs: 22 }}>
                <StyledModalCommandCardContainer>
                    <Header
                        closeButtonTitle='Fechar'
                        commandName={props.command.name}
                        onClose={props.modal.close}
                    />
                    <Section
                        aliasesDescription={'This is a example of markdown **```Hello World```**'}
                        argumentDescription={props.command.description}
                        exampleDescription={props.command.description}
                        howToUseDescription={props.command.description}
                    />
                    <Footer categoryName="Admin" />
                </StyledModalCommandCardContainer>
            </Grid.Row>
        </Grid>
    );
}

export default ModalCommandCard;