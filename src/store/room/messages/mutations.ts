import { MutationTree } from 'vuex'
import { MessagesState } from './types'

const mutations: MutationTree<MessagesState> = {
  connect: (state, payload) => {
    state.room = payload.room
    state.unsubscribe = payload.unsubscribe
  },
  disconnect: (state) => {
    state.room = null
    state.unsubscribe = null
  },
  sync: (state, payload) => {
    state.messages = payload
  },
}

export default mutations
