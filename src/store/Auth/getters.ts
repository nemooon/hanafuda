import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { AuthState } from './types';

const getters: GetterTree<AuthState, RootState> = {
  initialized: (state: AuthState) => {
    return state.init;
  },
  authenticate: (state: AuthState) => {
    return state.me !== null
  },
  user: (state: AuthState) => {
    return state.me;
  },
  nickname: (state: AuthState) => {
    return state.me?.name;
  },
};

export default getters;
