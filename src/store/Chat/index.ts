import { Module } from 'vuex';
import { socket } from '@/socket';
import { RootState } from '@/store/types';
import { ChatState } from './types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state: ChatState = {
  messages: [],
  typing: [],
};

export const chat: Module<ChatState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
