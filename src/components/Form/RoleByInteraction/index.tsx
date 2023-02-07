import { ForwardRefRenderFunction, useImperativeHandle, useRef, forwardRef, useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useChannels from "../../../hooks/Discord/useChannels";
import { ComponentStringSelect, MessageWithComponentsType } from "../../../services/discord/modules/modules.types";
import LocalStorage from "../../../utils/localStorage";
import Notification from "../../Notification";
import MessageComponentForm from "../Layouts/MessageComponentForm";
import MessageForm from "../Layouts/MessageForm";
import replaceVarsInString from '../../../utils/replaceVarsInString'
import { useApp } from "../../../context/App";
import RoleByInteractionService from "../../../services/discord/modules/roleByInteraction";
import cleanObject from "../../../utils/cleanObject";
import LoadWrapper from "../../Loading/LoadWrapper";

export type RoleByInteractionFormRef = {
    submit: () => void;
    reset: () => void;
}

type RoleByInteractionProps = {
    initialState?: MessageWithComponentsType;
    onFieldsChange?: (message: MessageWithComponentsType) => void;
    onSubmitEnd?: () => void;
    onSubmitStart?: () => void;
}

const RoleByInteractionForm: ForwardRefRenderFunction<RoleByInteractionFormRef, RoleByInteractionProps> = (props, ref) => {
    const methods = useForm<MessageWithComponentsType>({
        mode: 'onBlur',
        defaultValues: LocalStorage.localFormData.get()?.form?.roleByInteraction
    });
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const { channels } = useChannels();
    const { locale } = useApp();
    const getValues = methods.getValues;

    useImperativeHandle(ref, () => ({
        submit: () => submitButtonRef.current?.click(),
        reset: () => { methods.reset({ components: [] }); }
    }));

    const onSubmit = async (data: MessageWithComponentsType) => {
        try {
            props.onSubmitStart?.();
            const localFormData = LocalStorage.localFormData.get();

            const stringSelectMaxValuesNotMatchWithOptionsLength = data.components.find(component => (
                component.components.find(_component => {
                    if (_component.type !== 'STRING_SELECT') return;
                    const stringSelect = (_component as ComponentStringSelect);
                    return stringSelect.options.length < Number(stringSelect.max_values);
                })
            ));

            if (stringSelectMaxValuesNotMatchWithOptionsLength) {
                const componentStringSelect = stringSelectMaxValuesNotMatchWithOptionsLength.components[0] as ComponentStringSelect;
                return Notification.open({
                    type: 'warning',
                    title: locale.notifications.warning.modules.roleByInteraction.invalidMaxValueAndOptionsLength.title,
                    description: replaceVarsInString(locale.notifications.warning.modules.roleByInteraction.invalidMaxValueAndOptionsLength.description, {
                        'value1': `${componentStringSelect.max_values}`,
                        'value2': `${componentStringSelect.options.length}`,
                        'value3': `${Number(componentStringSelect.max_values) - componentStringSelect.options.length}`
                    }, { replaceVarsInLocale: true }),
                }, 12000);
            };

            LocalStorage.localFormData.set({
                ...localFormData,
                form: {
                    ...localFormData.form,
                    roleByInteraction: data,
                }
            });

            await RoleByInteractionService.create(cleanObject({ ...data, channelId: data.channelId ?? channels?.find(channel => channel.type === 'GUILD_TEXT')?.id }));
            Notification.open({ type: 'success', ...locale.notifications.success.shared.created });
        } catch (error) {
            Notification.open({ type: 'error', ...locale.notifications.error.shared.unexpectedError });
            console.error(error);
        } finally {
            props.onSubmitEnd?.();
        }
    }

    const onChangeFields = props.onFieldsChange;
    const onChange = useCallback(() => {
        onChangeFields?.(getValues());
    }, [onChangeFields, getValues]);
    useEffect(() => { onChange() }, [onChange]);

    return (
        <LoadWrapper isLoading={!channels?.length}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} onChange={onChange}>
                    <MessageForm disableAutocomplete channels={channels!} />
                    <MessageComponentForm />
                    <button ref={submitButtonRef} type='submit' style={{ display: 'none' }} />
                </form>
            </FormProvider>
        </LoadWrapper>
    );
}

export default forwardRef(RoleByInteractionForm);