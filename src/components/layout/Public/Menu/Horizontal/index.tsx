import { useRouter } from 'next/router';
import { useApp } from "../../../../../context/App";
import { useAuth } from "../../../../../context/Auth";
import OptionsButton from '../../../../Buttons/OptionsButton';
import Logo from "../../../../Logo";
import StyledLink from '../Link';
import { Anchor, Header } from '../styled';
import { MenuContainer, MenuItem, Navbar } from "./styles";
import LocaleButton from '../LocaleButton';

const MainLayoutHeader: React.FC = props => {
    const auth = useAuth();
    const { locale: { lang, layouts: { public: { menu } } } } = useApp();
    const router = useRouter();

    return (
        <Header>
            <Navbar>
                <MenuContainer verticalAlign="flex-end">
                    <MenuItem>
                        <StyledLink
                            href={`/${lang}`}
                            selected={router.asPath === `/${lang}`}
                            label={menu.home}
                        />
                    </MenuItem>
                    <MenuItem>
                        <StyledLink
                            href={`/${lang}/help`}
                            selected={router.asPath === `/${lang}/help`}
                            label={menu.help}
                        />
                    </MenuItem>
                    <MenuItem>
                        <StyledLink
                            href={`/${lang}/commands`}
                            selected={router.asPath === `/${lang}/commands`}
                            label={menu.commands}
                        />
                    </MenuItem>
                </MenuContainer>
                <Logo />
                <MenuContainer>
                    <MenuItem>
                        <LocaleButton />
                    </MenuItem>
                    {auth.isAuthenticated
                        ? (
                            <MenuItem>
                                <OptionsButton localeLang={lang} label={menu.optionsButton} />
                            </MenuItem>
                        )
                        : (
                            <MenuItem>
                                <Anchor href={auth.discordAuthUrl}>{menu.login}</Anchor>
                            </MenuItem>
                        )}
                </MenuContainer>
            </Navbar>
        </Header>
    )
}

export default MainLayoutHeader;