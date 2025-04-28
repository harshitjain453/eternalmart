// shared/theme/palette.ts
export const lightPalette = {
    mode: 'light' as const,
    primary: { main: '#1E3A8A' },
    secondary: { main: '#3B82F6' },
    background: { default: '#F5F5F5', paper: '#FFFFFF' },
    text: { primary: '#1A1A1A', secondary: '#555555' },
};

export const darkPalette = {
    mode: 'dark' as const,
    primary: { main: '#3B82F6' },
    secondary: { main: '#3B82F6' },
    background: { default: '#121212', paper: '#1E1E1E' },
    text: { primary: '#FFFFFF', secondary: '#BBBBBB' },
};
