import React, { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Define a type for the component props
interface MUIProviderThemeProps {
  children: ReactNode; // This allows any valid React node
}

// Create a theme instance
const theme = createTheme({
});

const MUIProviderTheme: React.FC<MUIProviderThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MUIProviderTheme;