import { InjectionKey } from 'vue'
import { createStore, createLogger, useStore as baseUseStore, Store } from 'vuex'
import { io } from 'socket.io-client';

const debug = process.env.NODE_ENV !== 'production'

export interface State {
  messages: string[],
}

export const key: InjectionKey<Store<State>> = Symbol();

export function useStore () {
  return baseUseStore(key);
}

export const store = createStore<State>({
  strict: debug,
  state: {
    messages: []
  },
  getters: {
    messages(state: State) {
      return state.messages
    },
  },
  mutations: {
    addMessage(state: State, message: string) {
      state.messages.push(message)
    },
  },
  actions: {
    send({ commit }, message: string) {
      commit('addMessage', message)
      socket.emit('new message', message);
    },
  },
  plugins: debug ? [createLogger()] : [],
});

const socket = io(':3333');

socket.on('message', (message: string) => {
  store.commit('addMessage', message)
});
