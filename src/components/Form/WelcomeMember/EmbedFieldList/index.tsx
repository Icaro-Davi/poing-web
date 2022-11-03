import { FC, useContext } from 'react';
import { IoArrowUp, IoArrowDownSharp, IoTrashSharp } from 'react-icons/io5';
import Grid from '../../../Grid';
import Input from '../../items/Input';
import Switch from '../../items/Switch';
import AutocompleteTextarea from '../../items/Autocomplete/Textarea';

import { welcomeModuleGridGutter } from '../Form';
import autocompleteVars from '../autocompleteVars';
import { IconButton, DangerButton } from '../../../Buttons';
import { SPACING } from '../../items/DefaultPropertyValues';
import { ThemeContext } from 'styled-components';

const EmbedFieldGridGutter: [number, number] = [6, 0];
const autocompleteTriggers = [
    {
        name: 'poingVars',
        list: autocompleteVars.welcomeModuleVars.listVarsValues({ withoutPictures: true }),
        trigger: autocompleteVars.welcomeModuleVars.trigger
    }
]

interface IProps {
    primaryColor: string;
    secondaryColor: string;
}

const EmbedField: FC<IProps> = props => (
    <div style={{ border: '3px dashed #FFF', width: '100%' }}>
        <Grid.Row breakpoints={{ xs: 24 }} style={{ padding: EmbedFieldGridGutter[0] }}>
            <Grid gutter={welcomeModuleGridGutter}>
                <Grid.Row breakpoints={{ xs: 6, md: 3 }}>
                    <Switch
                        label='Em Linha'
                        color={{ bgActive: props.primaryColor }}
                    />
                </Grid.Row>
                <Grid.Row breakpoints={{ xs: 18, md: 21 }}>
                    <Input
                        label='Titulo do campo'
                    />
                </Grid.Row>
                <Grid.Row breakpoints={{ xs: 24 }}>
                    <AutocompleteTextarea
                        label='Descrição de campo'
                        triggers={autocompleteTriggers}
                    />
                </Grid.Row>
                <Grid.Row breakpoints={{ xs: 24 }}>
                    <Grid>
                        <Grid.Row breakpoints={{ xs: 8 }} style={{ display: 'flex', flexFlow: 'row', columnGap: SPACING.sm, alignItems: 'center' }}>
                            <IconButton hoverColor={props.primaryColor}>
                                <IoArrowUp />
                            </IconButton>
                            <IconButton hoverColor={props.secondaryColor}>
                                <IoArrowDownSharp />
                            </IconButton>
                        </Grid.Row>
                        <Grid.Row breakpoints={{ xs: 16 }} horizontalAlign='right'>
                            <div style={{ width: '100%', maxWidth: 200 }}>
                                <DangerButton
                                    label='Remover'
                                    icon={<IoTrashSharp />}
                                />
                            </div>
                        </Grid.Row>
                    </Grid>
                </Grid.Row>
            </Grid>
        </Grid.Row>
    </div>
);

const EmbedFields: FC = props => {
    const { colors } = useContext(ThemeContext);
    return (
        <Grid gutter={[EmbedFieldGridGutter[0], 0]}>
            <EmbedField primaryColor={colors.primary} secondaryColor={colors.secondary} />
            <EmbedField primaryColor={colors.primary} secondaryColor={colors.secondary} />
            <EmbedField primaryColor={colors.primary} secondaryColor={colors.secondary} />
            <EmbedField primaryColor={colors.primary} secondaryColor={colors.secondary} />
        </Grid>
    );
}

export default EmbedFields;