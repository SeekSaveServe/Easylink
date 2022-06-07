import { useContext, createContext } from 'react';
import { useBasicAlert } from './Alert';

export const AlertContext = createContext();
export function useAlert() {
    return useContext(AlertContext);
}

export function AlertProvider({ children }) {
    const { showAlert, BasicAlert } = useBasicAlert();
    return (
        <AlertContext.Provider value={showAlert}>
            <BasicAlert/>
            {children}
        </AlertContext.Provider>
    )
}