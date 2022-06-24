import Card from ".";
import { cardsBreakpoints } from "../../pages";
import Grid from "../Grid"
import Tag from "../Tag";
import { TagThemeType } from "../Tag/index.types";
import { Title } from "../Typography";

type Command = {
    command: string;
    description: string;
};

interface ICommandCard {
    title: string;
    tagTheme?: TagThemeType;
    openModal?: (content: any) => void;
    commands: Command[];
}

const ListCommands = (command: Command & { tagTheme?: TagThemeType, onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }) => {
    return (
        <div key={`${command}`} onClick={command?.onClick} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ whiteSpace: 'nowrap' }}>
                <Tag weight="bold" borderTheme={command.tagTheme}>{command.command}</Tag>
            </div>
            <Tag style={{ lineBreak: 'anywhere' }}>{command.description}</Tag>
        </div>
    );
}

const CommandsCard: React.FC<ICommandCard> = ({ commands, title, openModal, tagTheme }) => {
    return (
        <Grid.Row style={{ margin: '1rem 0' }} breakpoints={cardsBreakpoints}>
            <Card style={{ width: '100%', position: 'relative', paddingTop: '1.5rem' }}>
                {title && <Title style={{ position: 'absolute', top: -33, left: 35 }} level="3">{title}</Title>}
                {commands.map(command => ListCommands({
                    ...command,
                    tagTheme: tagTheme,
                    onClick: () => openModal && openModal({ title, command })
                }))}
            </Card>
        </Grid.Row>
    );
}

export default CommandsCard;