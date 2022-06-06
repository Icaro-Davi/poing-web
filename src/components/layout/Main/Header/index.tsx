import Link, { LinkProps } from "next/link";
import { useApp } from "../../../../context/App";
import { Anchor, Header, MenuContainer, MenuItem } from "./styles";

interface IStyledLink extends LinkProps {
    label?: string;
}

const StyledLink: React.FC<IStyledLink> = props => (
    <Link {...props} passHref>
        <Anchor>{props.label}</Anchor>
    </Link>
);

const MainLayoutHeader: React.FC = props => {
    const { locale } = useApp();
    return (
        <Header>
            <nav>
                <MenuContainer>
                    <MenuItem>
                        <StyledLink href='/' label={locale?.navbar.mainMenu.home} />
                    </MenuItem>
                    <MenuItem>
                        <StyledLink href='/' label={locale?.navbar.mainMenu.help} />
                    </MenuItem>
                    <MenuItem>
                        <StyledLink href='/' label={locale?.navbar.mainMenu.commands} />
                    </MenuItem>
                    <MenuItem>
                        <StyledLink href='/' label={locale?.navbar.mainMenu.login} />
                    </MenuItem>
                </MenuContainer>
            </nav>
        </Header>
    )
}

export default MainLayoutHeader;