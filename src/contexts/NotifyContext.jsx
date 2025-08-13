import { createContext, useState } from 'react';


export const NotifyContext = createContext();


export const NotifyProvider = ({ children }) => {
    const [countNotify, setNotify] = useState(0);

    return (
        <NotifyContext.Provider value={{ countNotify, setNotify }}>
            {children}
        </NotifyContext.Provider>
    );
};