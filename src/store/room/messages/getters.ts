import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { MessagesState } from './types'

const getters: GetterTree<MessagesState, RootState> = {
  messages: (state: MessagesState) => {
    return state.messages
  },
}

export default getters
