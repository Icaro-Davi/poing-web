import { NextPage } from "next";
import { Fragment } from "react";
import CommandsCard from "../components/Card/Commands";
import Grid from "../components/Grid";
import ModalCommandCard from "../components/Modal/Command";
import { useApp } from "../context/App";
import useModal from "../hooks/useModal";

const Commands: NextPage = props => {
    const { locale } = useApp();
    const [CommandModal, modal] = useModal(ModalCommandCard);
    return (
        <Fragment>
            <Grid horizontalAlign="center">
                <CommandsCard
                    title="Admin"
                    tagTheme="admin"
                    openModal={(content) => {
                        modal.setContent(content);
                        modal.open();
                    }}
                    commands={[
                        { name: 'help', description: 'Ao usar pode buscar as informações de um comando especifico, como também listar todos os disponíveis.' },
                    ]}
                />
                <CommandsCard
                    title="Moderação"
                    tagTheme="moderation"
                    commands={[
                        { name: 'help', description: 'Ao usar pode buscar as informações de um comando especifico, como também listar todos os disponíveis.' },
                    ]}
                />
                <CommandsCard
                    title="Utilitário"
                    tagTheme="utility"
                    commands={[
                        { name: 'help', description: 'Ao usar pode buscar as informações de um comando especifico, como também listar todos os disponíveis.' },
                    ]}
                />
            </Grid>
            <CommandModal />
        </Fragment>
    );
}

export default Commands;