import { ThemeProvider } from "styled-components";
import defaultTheme from "../../styles/themes/default";

interface IProps {
    children: React.ReactNode;
}

const AppThemeProvider: React.FC<IProps> = props => {
    return (
        <ThemeProvider theme={defaultTheme}>
            {props.children}
        </ThemeProvider>
    );
}

export default AppThemeProvider;