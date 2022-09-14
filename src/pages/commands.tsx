import { useRouter } from "next/router";
import { Fragment, useEffect, useRef } from "react";
import CommandsCard from "../components/Card/Commands";
import Grid from "../components/Grid";
import handleGetLayout from "../components/layout/handleGetLayout";
import PublicLayout from "../components/layout/Public";
import ModalCommandCard from "../components/Modal/Command";
import { useApp } from "../context/App";
import useModal from "../hooks/useModal";
import { Locale } from "../locale/index.type";
import { NextPageWithLayout, PickInside } from "../utils/general.types";

type Command = PickInside<Locale, 'commands'>;

const ReduceLocale = (locale: Locale) => locale.commands.reduce((prev, current) => {
    if (prev[current.category]) {
        prev[current.category].push(current);
    } else {
        prev[current.category] = [current];
    }
    return prev;
}, {} as { [k: string]: Command[] });

const CommandPage: NextPageWithLayout = props => {
    const { query } = useRouter();
    const { locale } = useApp();
    const [CommandModal, modal] = useModal(ModalCommandCard);
    const commandsRef = useRef(Object.entries(ReduceLocale(locale)));

    const openCommandModalByQueryString = () => {
        const commandByCategoryIndex = commandsRef.current.findIndex(([category, _]) => category.toLowerCase() === `${query.category}`.toLowerCase());
        if (commandByCategoryIndex > -1) {
            const command = commandsRef.current[commandByCategoryIndex][1].find(command => command.name === query.command);
            command && (() => {
                modal.setContent({ title: command.name, command });
                modal.open();
            })();
        }
    }

    useEffect(() => { query && openCommandModalByQueryString() }, [query]);

    return (
        <Fragment>
            <Grid horizontalAlign="center">
                {commandsRef.current.map((commandsByCategory, index) => (
                    <CommandsCard
                        tagTheme="admin"
                        key={`${[commandsByCategory[0]]}-${index}`}
                        title={commandsByCategory[0]}
                        commands={commandsByCategory[1]}
                        openModal={(content) => {
                            modal.setContent(content);
                            modal.open();
                        }}
                    />
                ))}
            </Grid>
            <CommandModal />
        </Fragment>
    );
}

CommandPage.getLayout = handleGetLayout(PublicLayout);

export default CommandPage;