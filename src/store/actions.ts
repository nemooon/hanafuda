import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';

const actions: ActionTree<RootState, RootState> = {
  start: async ({ commit }) => {
    commit('start')
  },
};

export default actions;
