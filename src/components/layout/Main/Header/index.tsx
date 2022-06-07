import Link, { LinkProps } from "next/link";
import { useRouter } from 'next/router';
import { useApp } from "../../../../context/App";
import { useAuth } from "../../../../context/Auth";
import Logo from "../../../Logo";
import { Anchor, Header, MenuContainer, MenuItem, Navbar } from "./styles";

interface IStyledLink extends LinkProps {
    label?: string;
    selected?: boolean;
}

const StyledLink: React.FC<IStyledLink> = props => (
    <Link {...props} passHref>
        <Anchor selected={props.selected}>{props.label}</Anchor>
    </Link>
);

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
                            href='/'
                            selected={router.asPath === '/'}
                            label={locale?.navbar.mainMenu.home}
                        />
                    </MenuItem>
                    <MenuItem>
                        <StyledLink
                            href='/help'
                            selected={router.asPath === '/help'}
                            label={locale?.navbar.mainMenu.help}
                        />
                    </MenuItem>
                </MenuContainer>
                <Logo />
                <MenuContainer>
                    <MenuItem>
                        <StyledLink
                            href='/commands'
                            selected={router.asPath === '/commands'}
                            label={locale?.navbar.mainMenu.commands}
                        />
                    </MenuItem>
                    {auth.isAuthenticated
                        ? (
                            <MenuItem>
                                <StyledLink
                                    href='/dashboard/poing'
                                    label="Dashboard"
                                />
                            </MenuItem>
                        )
                        : (
                            <MenuItem>
                                <Anchor onClick={auth.logIn} href='#'>{locale?.navbar.mainMenu.login}</Anchor>
                            </MenuItem>
                        )}
                </MenuContainer>
            </Navbar>
        </Header>
    )
}

export default MainLayoutHeader;