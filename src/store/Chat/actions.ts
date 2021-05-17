import { ActionTree } from 'vuex';
import { socket } from '@/socket';
import { RootState } from '@/store/types';
import { ChatState, Message } from './types';
import { parseISO } from 'date-fns'

const actions: ActionTree<ChatState, RootState> = {

  connect: async ({ commit }) => {
    socket.emit('chat/connect', ({ messages }) => {
      commit('init', {
        messages: messages.map(message => ({
          ...message,
          date: parseISO(message.date),
        })),
      });
    })

    socket.off('chat/typing')
    socket.on('chat/typing', payload => {
      commit('typing', payload);
    });

    socket.off('chat/message')
    socket.on('chat/message', message => {
      commit('add', {
        ...message,
        date: parseISO(message.date),
      });
    });
  },

  disconnect: async () => {
    socket.off('chat/message')
  },

  input: async ({}, typing: boolean) => {
    const payload = {
      sender: 'プレイヤー',
      typing,
    }
    socket.emit('chat/input', payload)
  },

  say: async ({ commit }, message: string) => {
    const payload = {
      sender: 'プレイヤー',
      body: message,
    }
    socket.emit('chat/say', payload, message => {
      commit('add', {
        ...message,
        date: parseISO(message.date),
      });
    });

    return true;
  },

};

export default actions;
