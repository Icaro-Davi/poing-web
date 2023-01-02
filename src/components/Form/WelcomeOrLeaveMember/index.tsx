import { forwardRef, ForwardRefRenderFunction, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { useApp } from '../../../context/App';
import DiscordGuildService from '../../../services/discord/guild';
import BaseError from '../../../utils/error/baseError';
import LocalStorage from '../../../utils/localStorage';
import LoadWrapper from '../../Loading/LoadWrapper';
import Notification from '../../Notification';
import FormElements from './Form';
import useBotInfo, { replaceBotVarsInString } from '../../../hooks/useBotInfo';

import type { GuildChannel } from '../../../services/discord/guild/guild.type';
import type { WelcomeOrLeaveMemberType } from '../../../services/discord/modules/modules.types';
import { ModulesType } from '../../../services/discord/bot/bot.types';
import { WelcomeMemberService, MemberLeaveService } from '../../../services/discord/modules';

export interface FormRefs {
    submit: () => void;
    testWelcomeMember: () => Promise<void>;
}

interface WelcomeOrLeaveMemberFormProps {
    onSubmitEnd?: () => void;
    onSubmitStart?: () => void;
    onChangeFields?: (formData: WelcomeOrLeaveMemberType) => void;
    initialDataForm?: WelcomeOrLeaveMemberType
    moduleType: keyof ModulesType;
}

const handleChannels = (channels?: GuildChannel[]) => channels
    ?.filter(channel => channel.type === 'GUILD_TEXT')
    .map(channel => ({ label: `# ${channel.name}` || '', value: channel.id })) ?? [];

const checkMessageTextIsActiveAndFilterModuleSettings = (moduleSettings: WelcomeOrLeaveMemberType) => {
    if (moduleSettings.isMessageText) {
        const { messageEmbed, ...settings } = moduleSettings;
        return settings;
    } else {
        const { messageText, ...settings } = moduleSettings;
        return settings;
    }
}

const WelcomeOrLeaveMemberForm: ForwardRefRenderFunction<FormRefs, WelcomeOrLeaveMemberFormProps> = ({ onSubmitEnd, onChangeFields, onSubmitStart, moduleType, ...props }, ref) => {
    const { locale } = useApp();
    const [channels, setChannels] = useState<{ label: string; value: string }[]>(handleChannels(LocalStorage.guild.getChannels()?.list));
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const botInfo = useBotInfo();
    const methods = useForm<WelcomeOrLeaveMemberType>({
        mode: 'all',
        defaultValues: props.initialDataForm,
    });

    const MemberModuleService = (() => {
        switch (moduleType) {
            case 'memberLeave':
                return MemberLeaveService;
            case 'welcomeMember':
                return WelcomeMemberService;
        }
    })();

    const testWelcomeMember: SubmitHandler<WelcomeOrLeaveMemberType> = async (moduleSettings, e) => {
        try {
            onSubmitStart?.();
            const moduleTestMessageSettings = {
                ...moduleSettings,
                botSettings: {
                    messageColor: LocalStorage.bot.getSettings()?.bot.messageEmbedHexColor
                },
                channelId: moduleSettings.channelId ?? channels[0].value,
                isMessageText: typeof moduleSettings.isMessageText === 'boolean' ? moduleSettings.isMessageText : false
            }

            const messageWithBotVars: WelcomeOrLeaveMemberType = JSON.parse(replaceBotVarsInString(JSON.stringify(moduleTestMessageSettings), botInfo));
            await MemberModuleService.testWelcomeMemberMessage(
                checkMessageTextIsActiveAndFilterModuleSettings(messageWithBotVars)
            );
        } catch (error) {
            Notification.open({ type: 'error', ...locale.notifications.warning.modules.welcomeOrLeaveMemberModuleTestMessage });
        } finally {
            onSubmitEnd?.();
        }
    }

    const onSubmit: SubmitHandler<WelcomeOrLeaveMemberType> = async (moduleSettings, e) => {
        try {
            onSubmitStart?.();
            moduleSettings = checkMessageTextIsActiveAndFilterModuleSettings(moduleSettings);
            const botSettings = LocalStorage.bot.getSettings();
            const storedModuleSettings = botSettings?.modules?.[moduleType]?.settings;
            if (storedModuleSettings && JSON.stringify(storedModuleSettings) === JSON.stringify(moduleSettings)) return;

            moduleSettings.channelId = moduleSettings.channelId ?? channels[0].value;
            moduleSettings.isMessageText = typeof moduleSettings.isMessageText === 'boolean' ? moduleSettings.isMessageText : false;

            if (storedModuleSettings)
                await MemberModuleService.updateSettings(moduleSettings);
            else
                await MemberModuleService.create(moduleSettings);

            Notification.open(locale.notifications.success.modules.updateMemberOrLeaveModuleSettings);
        } catch (error) {
            new BaseError({
                locale,
                message: 'Failed on create/update welcomeOrLeaveMember module',
                origin: 'src.components.Form.WelcomeOrLeaveMember',
                callback: locale => {
                    Notification.open({
                        ...locale.notifications.error.modules.updateWelcomeOrLeaveMemberSettings,
                        type: 'error'
                    });
                },
                error
            });
        } finally {
            onSubmitEnd?.();
        }
    }

    useImperativeHandle(ref, () => ({
        testWelcomeMember: methods.handleSubmit(testWelcomeMember),
        submit: () => submitButtonRef.current?.click(),
    }));

    const getValues = methods.getValues;

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

export default forwardRef(WelcomeOrLeaveMemberForm);