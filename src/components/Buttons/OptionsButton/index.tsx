import Link from 'next/link';
import { IoExitOutline, IoSettingsOutline } from 'react-icons/io5';
import Image from '../../Img';

import type { FC } from 'react';
import { OptionsButtonContainer } from './styled';
import { useAuth } from '../../../context/Auth';
import LoadWrapper from '../../Loading/LoadWrapper';

const ICON_SIZE = 20;

const OptionsButton: FC = props => {
    const { logOut, user } = useAuth();
    return (
        <LoadWrapper isLoading={!user}>
            <OptionsButtonContainer>
                <button>
                    <span>{user?.username}#{user?.discriminator}</span>
                    {user && <div>
                        <Image
                            imageSrc={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`}
                            alt={`${user.username}#${user.discriminator}`}
                        />
                    </div>}
                </button>
                <ul>
                    <li>
                        <Link href='/dashboard/poing'><a><IoSettingsOutline size={ICON_SIZE} />Dashboard</a></Link>
                    </li>
                    <li>
                        <a href='#' onClick={logOut}><IoExitOutline size={ICON_SIZE} />Sair</a>
                    </li>
                </ul>
            </OptionsButtonContainer>
        </LoadWrapper>
    );
}

export default OptionsButton;