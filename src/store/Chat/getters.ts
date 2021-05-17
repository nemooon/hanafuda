import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { ChatState } from './types';

const getters: GetterTree<ChatState, RootState> = {
  size: (state: ChatState) => {
    return state.messages.length;
  },
};

export default getters;
