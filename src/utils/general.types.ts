import { NextPage } from "next";
import { ReactElement, ReactNode } from 'react';
import { AppTheme } from "../styles/themes/default";

export type PickKeys<T, Key extends keyof T> = keyof T[Key];
export type PickInside<Type extends { [k: string]: any }, Key extends keyof Type> = Type[Key][any];
export type ThemeColorsKeys = PickKeys<AppTheme, 'colors'>;

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
}