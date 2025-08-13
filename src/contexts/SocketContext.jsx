import { createContext, useContext, useEffect } from 'react';
import { socket } from '../services/sockets/socket.jsx';

const SocketContext = createContext(socket);

export const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.connect();

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);