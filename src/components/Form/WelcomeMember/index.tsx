import { forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useApp } from '../../../context/App';
import DiscordGuildService from '../../../services/discord/guild';
import { WelcomeMemberService } from '../../../services/discord/modules';
import { WelcomeModuleType } from '../../../services/discord/modules/modules.types';
import BaseError from '../../../utils/error/baseError';
import LocalStorage from '../../../utils/localStorage';
import LoadWrapper from '../../Loading/LoadWrapper';
import Notification from '../../Notification';
import FormElements from './Form';
import useBotInfo, { replaceBotVarsInString } from '../../../hooks/useBotInfo';
import { GuildChannel } from '../../../services/discord/guild/guild.type';

export interface FormRefs {
    submit: () => void;
    testWelcomeMember: () => Promise<void>;
}

interface WelcomeMemberFormProps {
    onSubmitEnd?: () => void;
    onSubmitStart?: () => void;
    onChangeFields?: (formData: WelcomeModuleType) => void;
    initialDataForm?: WelcomeModuleType;
}

const handleChannels = (channels?: GuildChannel[]) => channels
    ?.filter(channel => channel.type === 'GUILD_TEXT')
    .map(channel => ({ label: `# ${channel.name}` || '', value: channel.id })) ?? [];

const WelcomeMemberForm: ForwardRefRenderFunction<FormRefs, WelcomeMemberFormProps> = ({ onSubmitEnd, onChangeFields, onSubmitStart, ...props }, ref) => {
    const { locale } = useApp();
    const [channels, setChannels] = useState<{ label: string; value: string }[]>(handleChannels(LocalStorage.guild.getChannels()?.list));
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const botInfo = useBotInfo();
    const methods = useForm<WelcomeModuleType>({
        mode: 'all',
        defaultValues: props.initialDataForm
    });
    const getValues = methods.getValues;

    const testWelcomeMember = async () => {
        if (Object.keys(methods.formState.errors).length) {
            Notification.open({
                type: 'warning', ...locale.notifications.warning.modules.welcomeMemberTestSettings
            });
            return;
        }
        const welcomeMemberSettings = {
            ...methods.getValues(),
            messageEmbed: {
                ...methods.getValues().messageEmbed,
                color: LocalStorage.bot.getSettings()?.bot.messageEmbedHexColor
            }
        }
        const welcomeMemberWithVars = JSON.parse(replaceBotVarsInString(JSON.stringify(welcomeMemberSettings), botInfo));
        await WelcomeMemberService.testWelcomeMemberMessage(welcomeMemberWithVars);
    }

    useImperativeHandle(ref, () => ({
        testWelcomeMember,
        submit: () => submitButtonRef.current?.click(),
    }));

    const onSubmit: SubmitHandler<WelcomeModuleType> = async (welcomeMemberFormData, e) => {
        try {
            onSubmitStart?.();
            const botSettings = LocalStorage.bot.getSettings();
            const welcomeMemberSettings = botSettings?.modules?.welcomeMember?.settings;
            if (welcomeMemberSettings && JSON.stringify(welcomeMemberSettings) === JSON.stringify(welcomeMemberFormData)) return;

            if (welcomeMemberSettings)
                await WelcomeMemberService.updateSettings(welcomeMemberFormData);
            else
                await WelcomeMemberService.create(welcomeMemberFormData);

            if (botSettings) {
                LocalStorage.bot.setSettings({
                    ...botSettings,
                    modules: {
                        ...botSettings.modules,
                        welcomeMember: {
                            ...botSettings.modules?.welcomeMember,
                            settings: welcomeMemberFormData
                        }
                    }
                });
            }
            Notification.open(locale.notifications.success.modules.updateWelcomeMemberSettings);
        } catch (error) {
            new BaseError({
                locale,
                message: 'Failed on create/update welcome module',
                origin: 'src.components.Form.WelcomeMemberForm',
                callback: locale => {
                    Notification.open({
                        ...locale.notifications.error.modules.updateWelcomeMemberSettings,
                        type: 'error'
                    });
                },
                error
            });
        } finally {
            onSubmitEnd?.();
        }
    }


    const onChange = useCallback(() => {
        onChangeFields?.(getValues());
    }, [onChangeFields, getValues]);

    useEffect(() => {
        DiscordGuildService.getChannels()
            .then(_channels => { setChannels(handleChannels(_channels)) });
    }, []);

    useEffect(() => { onChange() }, [onChange]);

    return (
        <FormProvider {...methods}>
            <LoadWrapper isLoading={!channels.length}>
                <form onSubmit={methods.handleSubmit(onSubmit)} onChange={onChange}>
                    <FormElements channels={channels} />
                    <button ref={submitButtonRef} type='submit' style={{ display: 'none' }} />
                </form>
            </LoadWrapper>
        </FormProvider>
    );
}

export default forwardRef(WelcomeMemberForm);