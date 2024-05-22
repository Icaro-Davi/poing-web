import { FC } from 'react';
import { UseFieldArrayMove, UseFieldArrayRemove, UseFormSetValue } from 'react-hook-form';
import { ReactNode } from 'react-markdown/lib/ast-to-react';
import { ComponentsType, MessageWithComponentsType } from '../../../../services/discord/modules/modules.types';
import { UserGuildType } from '../../../../services/discord/user/user.types';
import LocalStorage from '../../../../utils/localStorage';
import Grid from '../../../Grid';
import DashedBorder from '../styles/DashedBorder';
import MessageComponentButton from './MessageComponentButton';
import MessageComponentStringSelect from './MessageComponentStringSelect';

export type ListManipulingProps = {
    index: number;
    components: ComponentsType[];
    has: {
        previous: boolean;
        next: boolean;
    };
    setValue: UseFormSetValue<MessageWithComponentsType>;
    remove: UseFieldArrayRemove;
    move: UseFieldArrayMove;
}

interface ListComponentByTypeProps extends ListManipulingProps { }

const WrapperContainer = (component: ReactNode | ReactNode[]) => (
    <Grid.Row breakpoints={{ xs: 24 }}>
        <DashedBorder>{component}</DashedBorder>
    </Grid.Row>
);

const ListComponentByType: FC<ListComponentByTypeProps> = props => {
    const { index } = props;

    const roles = (LocalStorage.guild.get(LocalStorage.guild.getSelectedId()) as UserGuildType)?.roles
        .map(role => ({ label: role.name, value: role.id }));

    switch (props.components[0].type) {
        case 'BUTTON':
            return WrapperContainer(
                <MessageComponentButton
                    index={props.index}
                    roles={roles}
                    removeButtons={() => props.remove(index)}
                />
            );
        case 'STRING_SELECT':
            return WrapperContainer(
                <MessageComponentStringSelect
                    index={props.index}
                    roles={roles}
                    removeSelectString={() => props.remove(index)}
                />
            )
        default:
            return null;
    }
}

export default ListComponentByType;