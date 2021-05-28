import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { MessagesState } from './types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state: MessagesState = {
  room: null,
  unsubscribe: null,
  messages: [],
  typing: [],
};

export const messages: Module<MessagesState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
