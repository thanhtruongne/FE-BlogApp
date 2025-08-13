import { io } from 'socket.io-client';
import { getAccessToken } from '../../utils/cookies';

export const socket = io(import.meta.env.VITE_APP_SERVER_URL, {
  auth: {
    token: getAccessToken()
  },
  autoConnect: true,
  transports: ['websocket'],
});