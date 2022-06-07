import { useContext, createContext } from 'react';
export const AlertContext = createContext();
export function useAlert() {
    return useContext(AlertContext);
}