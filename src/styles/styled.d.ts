import 'styled-components';
import { AppTheme } from "./themes/default";

declare module 'styled-components' {
    export interface DefaultTheme extends AppTheme { }
}