import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';

const getters: GetterTree<RootState, RootState> = {
  // size: (state: RootState) => {
  //   return state.messages.length;
  // },
};

export default getters;
