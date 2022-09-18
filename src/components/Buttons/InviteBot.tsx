import { FC } from "react";
import { ButtonShining } from ".";
import { useApp } from "../../context/App";
import { SiDiscord } from 'react-icons/si';

const InviteBotBtn: FC = props => {
    const { locale: { pages: { root: { home: { welcomeCard } } } } } = useApp();
    return (
        <ButtonShining
            style={{ position: 'relative', marginTop: '0.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', columnGap: '.5em' }}
            onClick={() => window.open(process.env.NEXT_PUBLIC_BOT_INVITE_URL, '_blank')?.focus()}
        ><SiDiscord /> {welcomeCard.buttonBotInvitation}</ButtonShining>
    )
}

export default InviteBotBtn;