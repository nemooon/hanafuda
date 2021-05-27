import { Module } from 'vuex';
// import { socket } from '@/socket';
import { RootState } from '@/store/types';
import { AuthState } from './types';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

const state: AuthState = {
  init: false,
  me: null,
};

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
