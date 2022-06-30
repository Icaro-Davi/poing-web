import Card from ".";
import { cardsBreakpoints } from "../../pages";
import Grid from "../Grid"
import Tag from "../Tag";
import { TagThemeType } from "../Tag/index.types";
import { Title } from "../Typography";
import { Locale } from '../../locale/index.type';
import { PickInside } from "../../utils/general.types";

type Command = PickInside<Locale, 'commands'>;

interface ICommandCard {
    title: string;
    tagTheme?: TagThemeType;
    openModal?: (content: { title: string, command: Command }) => void;
    commands: Command[];
}

const ListCommands = (command: Command & { tagTheme?: TagThemeType, onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void }, options: { marginTop: boolean }) => {
    return (
        <div key={`${command.name}`} onClick={command?.onClick} title={command.name} style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            rowGap: 10,
            marginTop: options.marginTop ? 12 : 0
        }}>
            <div style={{ whiteSpace: 'nowrap' }}>
                <Tag weight="bold" borderTheme={command.tagTheme}>{command.name}</Tag>
            </div>
            <Tag>{command.description}</Tag>
        </div>
    );
}

const CommandsCard: React.FC<ICommandCard> = ({ commands, title, openModal, tagTheme }) => {
    return (
        <Grid.Row style={{ margin: '1.5rem 0' }} breakpoints={cardsBreakpoints}>
            <Card style={{ width: '100%', position: 'relative', paddingTop: '1.5rem' }}>
                {title && <Title style={{ position: 'absolute', top: -33, left: 35 }} level="3">{title}</Title>}
                {commands.map((command, index) => ListCommands({
                    ...command,
                    tagTheme: tagTheme,
                    onClick: () => openModal && openModal({ title, command })
                }, { marginTop: !!index }))}
            </Card>
        </Grid.Row>
    );
}

export default CommandsCard;