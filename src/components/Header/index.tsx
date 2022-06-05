import { useApp } from "../../context/App";

const Navbar: React.FC = props => {
    const { locale } = useApp();
    return (
        <header>
            <nav>
                <ul>
                    <li>{locale?.navbar.mainMenu.home}</li>
                    <li>{locale?.navbar.mainMenu.help}</li>
                    <li>{locale?.navbar.mainMenu.commands}</li>
                    <li>{locale?.navbar.mainMenu.login}</li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;