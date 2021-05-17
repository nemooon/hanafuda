import { io } from 'socket.io-client';

const debug = process.env.NODE_ENV !== 'production'

export const socket = io();
