import { MutationTree } from 'vuex';
import { RootState } from '@/store/types';

const mutations: MutationTree<RootState> = {
  start: (state) => {
    state.started = true
  },
};

export default mutations;
