import { AppTheme } from "../styles/themes/default";

export type PickKeys<T, Key extends keyof T> = keyof T[Key];
export type ThemeColorsKeys = PickKeys<AppTheme, 'colors'>;