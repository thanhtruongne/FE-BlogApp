import React, { createContext, useContext } from 'react';
import { useWebSocketConnection } from '../hook/useWebSocket';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const wsConnection = useWebSocketConnection();

    return (
        <WebSocketContext.Provider value={wsConnection}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocketContext must be used within a WebSocketProvider');
    }
    return context;
}; 