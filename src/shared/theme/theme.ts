// shared/theme/themes.ts
import { createTheme } from '@mui/material/styles';
import { lightPalette, darkPalette } from './pallet';
import { typography } from './typography';

export const lightTheme = createTheme({
    palette: lightPalette,
    //@ts-ignore
    typography,
});

export const darkTheme = createTheme({
    palette: darkPalette,
    //@ts-ignore
    typography,
});
