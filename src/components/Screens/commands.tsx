import { useRouter } from "next/router";
import { useEffect, useRef, FC } from "react";
import CommandsCard from "../../components/Card/Commands";
import Grid from "../../components/Grid";
import ModalCommandCard from "../../components/Modal/Command";
import { useApp } from "../../context/App";
import useModal from "../../hooks/useModal";
import { Locale } from "../../locale/index.type";
import { PickInside } from "../../utils/general.types";

type Command = PickInside<Locale, 'commands'>;

const ReduceLocale = (locale: Locale) => locale.commands.reduce((prev, current) => {
    if (prev[current.category]) {
        prev[current.category].push(current);
    } else {
        prev[current.category] = [current];
    }
    return prev;
}, {} as { [k: string]: Command[] });

const CommandScreen: FC = props => {
    const { query } = useRouter();
    const { locale } = useApp();
    const [CommandModal, modal] = useModal(ModalCommandCard);
    const commandsRef = useRef(Object.entries(ReduceLocale(locale)));

    useEffect(() => {
        const openCommandModalByQueryString = () => {
            if (!query) return;
            const commandByCategoryIndex = commandsRef.current.findIndex(([category, _]) => category.toLowerCase() === `${query.category}`.toLowerCase());
            if (commandByCategoryIndex > -1) {
                const command = commandsRef.current[commandByCategoryIndex][1].find(command => command.name === query.command);
                command && (() => {
                    modal.setContent({ title: command.name, command });
                    modal.open();
                })();
            }
        }
        openCommandModalByQueryString();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <Grid horizontalAlign="center" style={{ flex: 1 }}>
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
            <CommandModal />
        </Grid>
    );
}

export default CommandScreen;