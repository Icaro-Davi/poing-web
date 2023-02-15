import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useApp } from "../context/App";
import { useAuth } from "../context/Auth";
import { BOT } from "../locale/defaultBoTInfo";
import LocalStorage from "../utils/localStorage";

function useBotInfo() {
    const { store: { guilds, selectedGuildId }, locale: { lang } } = useApp();
    const { user } = useAuth();
    const guild = guilds.find(guild => guild.id === selectedGuildId);
    const botSettings = LocalStorage.bot.getSettings();
    const [vars, setVars] = useState({
        member: {
            username: user?.username,
            picture: user?.avatar,
            tagNumber: user?.discriminator,
            joinedAt: '',
            mention: `<@${user?.id}>`
        },
        guild: {
            name: guild?.name,
            picture: guild?.icon
        },
        bot: {
            prefix: BOT.prefix,
            name: BOT.name,
            '@mention': `<@${process.env.NEXT_PUBLIC_BOT_INVITE_URL?.match(/(client_id=)([\d]+)/)?.[2]}>`,
            hexColor: botSettings?.bot.messageEmbedHexColor ?? '#FFFFFF'
        }
    });

    const getMomentByLang = useCallback(async (lang: string) => {

        await import(`moment/locale/${lang}`).catch(err => {
            console.log('module', lang, 'not found on moment');
        });

        setVars(vars => ({
            ...vars,
            member: {
                ...vars.member,
                joinedAt: moment().startOf('year').fromNow().replaceAll(/\d/g, 'X')
            }
        }));
    }, []);

    useEffect(() => { getMomentByLang(lang.toLocaleLowerCase()); }, [lang]);

    return vars;
}

export default useBotInfo;