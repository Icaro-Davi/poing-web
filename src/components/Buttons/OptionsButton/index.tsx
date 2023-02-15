import Link from 'next/link';
import { IoExitOutline, IoSettingsOutline } from 'react-icons/io5';
import Image from '../../Img';

import type { FC } from 'react';
import { OptionsButtonContainer } from './styled';
import { useAuth } from '../../../context/Auth';
import LoadWrapper from '../../Loading/LoadWrapper';
import { useApp } from '../../../context/App';
import { BOT } from '../../../locale/defaultBoTInfo';
import { BreakpointsMatch } from '../../../hooks/useMatchMedia';

const ICON_SIZE = 20;

interface IProps {
    localeLang: string;
    label: {
        dashboard: string;
        exit: string;
    }
}

const handleUsernameSize = (breakpoints: BreakpointsMatch, username: string) => {
    if (breakpoints.lg)
        return username.length > 30 ? username.slice(0, 30) : username;
    if (breakpoints.md)
        return username.length > 14 ? username.slice(0, 14) : username;
    if (breakpoints.sm || breakpoints.xs)
        return username.length > 10 ? username.slice(0, 10) : username;
    return username;

}

const OptionsButton: FC<IProps> = props => {
    const { logOut, user: user } = useAuth();
    const { layout } = useApp();
    return (
        <LoadWrapper isLoading={!user}>
            <OptionsButtonContainer>
                <button>
                    <span>{handleUsernameSize(layout.breakpoints, `${user?.username ?? BOT.name}#${user?.discriminator}`)}</span>
                    {user && user.avatar && <div>
                        <Image
                            imageSrc={user.avatar}
                            alt={`${user.username}#${user.discriminator}`}
                        />
                    </div>}
                </button>
                <ul>
                    <li>
                        <Link href={`/${props.localeLang}/dashboard/poing`}><a><IoSettingsOutline size={ICON_SIZE} />{props.label.dashboard}</a></Link>
                    </li>
                    <li>
                        <a href='#' onClick={logOut}><IoExitOutline size={ICON_SIZE} />{props.label.exit}</a>
                    </li>
                </ul>
            </OptionsButtonContainer>
        </LoadWrapper>
    );
}

export default OptionsButton;