import { useCallback, useState } from 'react';
import useWebSocket from 'react-use-websocket';

// Fix the URL construction - remove the extra 'http//'
const WS_URL = `ws://localhost:3002/ws`;  // Direct WebSocket URL

// Or if you want to use environment variable:
// const WS_URL = `ws://${import.meta.env.VITE_APP_SERVER_URL?.replace('http://', '') || 'localhost:3002'}/ws`;

export const useWebSocketConnection = () => {
    const [isConnected, setIsConnected] = useState(false);

    const {
        sendMessage,
        lastMessage,
        readyState,
        getWebSocket
    } = useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
            setIsConnected(true);
        },
        onClose: () => {
            console.log('WebSocket connection closed');
            setIsConnected(false);
        },
        onError: (error) => {
            console.error('WebSocket error:', error);
            setIsConnected(false);
        },
        onMessage: (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received message:', data);
            } catch (error) {
                console.error('Error parsing message:', error);
            }
        },
        shouldReconnect: (closeEvent) => true, // Enable auto-reconnection
        reconnectAttempts: 5,
        reconnectInterval: 3000,
    });

    // Send JSON message helper
    const sendJsonMessage = useCallback((data) => {
        sendMessage(JSON.stringify(data));
    }, [sendMessage]);

    // Connection status
    const connectionStatus = {
        [WebSocket.CONNECTING]: 'Connecting',
        [WebSocket.OPEN]: 'Open',
        [WebSocket.CLOSING]: 'Closing',
        [WebSocket.CLOSED]: 'Closed',
    }[readyState];

    return {
        sendJsonMessage,
        lastMessage,
        isConnected,
        connectionStatus,
        readyState,
        getWebSocket
    };
};