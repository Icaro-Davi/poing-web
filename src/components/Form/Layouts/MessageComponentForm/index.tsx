import { FC, Fragment, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IoAddSharp } from 'react-icons/io5';
import { useApp } from '../../../../context/App';
import { ComponentsType, MessageWithComponentsType } from '../../../../services/discord/modules/modules.types';
import LocalStorage from '../../../../utils/localStorage';
import { Button } from '../../../Buttons';
import Grid from '../../../Grid';
import { SPACING } from '../../items/DefaultPropertyValues';
import Label from '../../items/Label';
import Select from '../../items/Select';
import DarkFormContainer from '../styles/DarkFormContainer';
import { formGridVerticalGutter } from '../styles/Default';
import ListComponentByType from './ListComponentByType';

const MessageComponentForm: FC = props => {
    const { control, setValue } = useFormContext<MessageWithComponentsType>();
    const { fields, append, move, remove, } = useFieldArray({ control, name: 'components', rules: { minLength: 1, maxLength: 5, required: true } });

    const { locale } = useApp();
    const selectOptionsLocale = locale.forms.layouts.messageComponents.field.selectComponent.options;
    const selectOptions = Object.keys(selectOptionsLocale).map(key => ({ label: selectOptionsLocale[key as keyof typeof selectOptionsLocale], value: key }));
    const [selectedComponent, setSelectedComponent] = useState<{ label: string; value: string }>(selectOptions[0]);

    const createComponent = () => {
        const guild = LocalStorage.guild.get(LocalStorage.guild.getSelectedId());
        const newComponent = {
            type: selectedComponent.value,
            ...selectedComponent.value === 'STRING_SELECT' ? { options: [{ label: '', value: '' }] } : {},
            ...selectedComponent.value === 'BUTTON' ? { roleId: guild.roles[0].id, style: 'PRIMARY' } : {}
        } as ComponentsType;
        append({ type: 'ACTION_ROW', components: [newComponent] });
    }

    return (
        <Fragment>
            {!!fields.length && (
                <DarkFormContainer>
                    <Grid gutter={formGridVerticalGutter}>
                        {fields.map((field, index) => (
                            <ListComponentByType
                                has={{ next: !!fields[index + 1], previous: !!fields[index - 1] }}
                                components={field.components}
                                setValue={setValue}
                                remove={remove}
                                key={field.id}
                                move={move}
                                index={index}
                            />
                        ))}
                    </Grid>
                </DarkFormContainer>
            )}
            <DarkFormContainer style={{ marginTop: SPACING.md }}>
                <Grid horizontalAlign='center'>
                    <Grid.Row breakpoints={{ md: 8 }}>
                        <Select
                            displayItemsTop
                            label={locale.forms.layouts.messageComponents.field.selectComponent.label}
                            initialValue={selectOptions[0]}
                            onSelect={setSelectedComponent}
                            options={selectOptions}
                        />
                    </Grid.Row>
                    <Grid.Row>
                        <Label>&nbsp;</Label>
                        <Button
                            icon={<IoAddSharp />}
                            disabled={fields.length > 4}
                            style={{ height: '100%', padding: 10, paddingTop: 9, paddingBottom: 9 }}
                            onClick={createComponent}
                        >{locale.labels.add}</Button>
                    </Grid.Row>
                </Grid>
            </DarkFormContainer>
        </Fragment>
    );
}

export default MessageComponentForm;