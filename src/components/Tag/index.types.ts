export type TagThemeType = 'admin' | 'moderation' | 'utility' | 'none';
export type TagProps = {
    borderTheme?: TagThemeType;
    weight?: 'bold' | 'light';
}