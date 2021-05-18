import { MutationTree } from 'vuex';
import { AuthState, User } from './types';

const mutations: MutationTree<AuthState> = {

  signin: (state, payload) => {
    state.me = {
      name: payload.displayName,
      uid: payload.uid,
    }
  },
  
  nickname: (state, payload) => {
    state.me.name = payload.nickname
  },

};

export default mutations;
