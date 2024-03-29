const defaultTheme = {
    title: 'default',

    colors: {
        primary: '#B0D6F5',
        secondary: '#FFA498',
        backgroundLighter: '#B0D6F5',
        backgroundDarker: '#98B2D3',
        black: '#23272A',
        white: '#FFFFFF',
        gray: '#D9D9D9',
        error: '#ff9494',
        success: '#52c41a',
        warning: '#faad14'
    }
}

export type AppTheme = typeof defaultTheme;
export default defaultTheme;