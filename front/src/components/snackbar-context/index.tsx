import { Snackbar, SnackbarProps } from "@mui/material";
import { ReactNode, createContext, useState } from "react";

interface SnackbarContextType {
    open: boolean;
    openSnack: (message: string, options?: SnackbarProps) => void;
    closeSnack: () => void;
}

export const SnackBarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
    children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [snackOptions, setSnackOptions] = useState<SnackbarProps | undefined>(undefined);

    const openSnack = (message: string, options?: SnackbarProps) => {
        setOpen(true);
        setSnackOptions(options);
        // You may set your custom timeout here if provided in options
    };

    const closeSnack = () => {
        setOpen(false);
        setSnackOptions(undefined);
    };

    return (
        <SnackBarContext.Provider value={{ open, openSnack, closeSnack }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={snackOptions?.autoHideDuration ?? 5000}
                onClose={closeSnack}
                {...snackOptions}
            />
        </SnackBarContext.Provider>
    );
};