import { MutationTree } from 'vuex'
import { RoomsState } from './types'

const mutations: MutationTree<RoomsState> = {
  connect: (state, payload) => {
    state.unsubscribe = payload.unsubscribe
  },
  disconnect: (state) => {
    state.unsubscribe = null
  },
  sync: (state, payload) => {
    state.list = payload
  },
}

export default mutations
