import { forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useImperativeHandle, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useApp } from "../../../context/App";
import useChannels from "../../../hooks/Discord/useChannels";
import useBotInfo from "../../../hooks/useBotInfo";
import { APIPartialEmoji, ComponentStringSelect, ComponentsType, MessageWithComponentsType } from "../../../services/discord/modules/modules.types";
import RoleByInteractionService from "../../../services/discord/modules/roleByInteraction";
import cleanObject from "../../../utils/cleanObject";
import LocalStorage from "../../../utils/localStorage";
import replaceVarsInString from '../../../utils/replaceVarsInString';
import LoadWrapper from "../../Loading/LoadWrapper";
import Notification from "../../Notification";
import MessageComponentForm from "../Layouts/MessageComponentForm";
import MessageForm from "../Layouts/MessageForm";

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
        defaultValues: {
            isMessageText: false,
            ...LocalStorage.localFormData.get()?.form?.roleByInteraction
        }
    });
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const { channels } = useChannels();
    const { locale } = useApp();
    const getValues = methods.getValues;
    const botInfo = useBotInfo();

    useImperativeHandle(ref, () => ({
        submit: () => submitButtonRef.current?.click(),
        reset: () => { methods.reset({ components: [] }); }
    }));

    const onSubmit = async (data: MessageWithComponentsType) => {
        try {
            props.onSubmitStart?.();
            data = JSON.parse(replaceVarsInString(JSON.stringify(data), botInfo));
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
                    ...localFormData?.form,
                    roleByInteraction: data,
                }
            });

            const checkEmojiIsUsed = (emoji: APIPartialEmoji) => {
                if (emoji.id || emoji.name) return { emoji };
                else return {}
            }

            data.components = data.components.map(selectRow => {
                return {
                    ...selectRow,
                    components: selectRow.components.map((component) => {
                        let { emoji, ...rest } = component as ComponentsType & { emoji: APIPartialEmoji };
                        if (component.type === 'BUTTON' || component.type === 'STRING_SELECT') {
                            return { ...rest, ...checkEmojiIsUsed(emoji) }
                        }
                        return component;
                    })
                }
            });

            const { messageEmbed, messageText, ...rest } = data;
            const botSettings = LocalStorage.bot.getSettings();
            await RoleByInteractionService.create(cleanObject({
                ...rest,
                channelId: rest.channelId ?? channels?.find(channel => channel.type === 'GUILD_TEXT')?.id,
                ...rest.isMessageText
                    ? { messageText }
                    : {
                        messageEmbed: {
                            ...messageEmbed!,
                            color: botSettings?.bot.messageEmbedHexColor ?? '#FFFFFF'
                        }
                    },
            }));
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