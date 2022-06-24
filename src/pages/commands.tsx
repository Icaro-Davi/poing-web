import { NextPage } from "next";
import { Fragment } from "react";
import CommandsCard from "../components/Card/Commands";
import Grid from "../components/Grid";
import useModal from "../hooks/useModal";
import { ModalComponent } from "../hooks/useModal/modal.types";

const Element: ModalComponent<{ count: number }> = props => {
    console.log(props)
    return <button onClick={() => props.modal.setContent({ count: 1 + props.count })}>Hello World {props.count}</button>
}

const Commands: NextPage = props => {
    const { ModalComponent, modal } = useModal(Element);

    return (
        <Fragment>
            <Grid horizontalAlign="center">
                <CommandsCard
                    title="Admin"
                    tagTheme="admin"
                    commands={[
                        { command: 'help', description: 'Ao usar pode buscar as informações de um comando especifico, como também listar todos os disponíveis.' },
                    ]}
                />
                <CommandsCard
                    title="Moderação"
                    tagTheme="moderation"
                    commands={[
                        { command: 'help', description: 'Ao usar pode buscar as informações de um comando especifico, como também listar todos os disponíveis.' },
                    ]}
                />
                <CommandsCard
                    title="Utilitário"
                    tagTheme="utility"
                    commands={[
                        { command: 'help', description: 'Ao usar pode buscar as informações de um comando especifico, como também listar todos os disponíveis.' },
                    ]}
                />
            </Grid>
            <ModalComponent />
        </Fragment>
    );
}

export default Commands;