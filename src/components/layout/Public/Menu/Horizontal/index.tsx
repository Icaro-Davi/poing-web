import { useRouter } from 'next/router';
import { useApp } from "../../../../../context/App";
import { useAuth } from "../../../../../context/Auth";
import OptionsButton from '../../../../Buttons/OptionsButton';
import Logo from "../../../../Logo";
import StyledLink from '../Link';
import { Anchor, Header } from '../styled';
import { MenuContainer, MenuItem, Navbar } from "./styles";

const MainLayoutHeader: React.FC = props => {
    const auth = useAuth();
    const { locale } = useApp();
    const router = useRouter();

    return (
        <Header>
            <Navbar>
                <MenuContainer verticalAlign="flex-end">
                    <MenuItem>
                        <StyledLink
                            href={`/${locale.lang}`}
                            selected={router.asPath === `/${locale.lang}`}
                            label={locale?.navbar.mainMenu.home}
                        />
                    </MenuItem>
                    <MenuItem>
                        <StyledLink
                            href={`/${locale.lang}/help`}
                            selected={router.asPath === `/${locale.lang}/help`}
                            label={locale?.navbar.mainMenu.help}
                        />
                    </MenuItem>
                </MenuContainer>
                <Logo />
                <MenuContainer>
                    <MenuItem>
                        <StyledLink
                            href={`/${locale.lang}/commands`}
                            selected={router.asPath === `/${locale.lang}/commands`}
                            label={locale?.navbar.mainMenu.commands}
                        />
                    </MenuItem>
                    {auth.isAuthenticated
                        ? (
                            <MenuItem>
                                <OptionsButton localeLang={locale.lang} />
                            </MenuItem>
                        )
                        : (
                            <MenuItem>
                                <Anchor href={auth.discordAuthUrl}>{locale?.navbar.mainMenu.login}</Anchor>
                            </MenuItem>
                        )}
                </MenuContainer>
            </Navbar>
        </Header>
    )
}

export default MainLayoutHeader;