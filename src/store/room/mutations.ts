import { MutationTree } from 'vuex'
import { RoomState } from './types'

const mutations: MutationTree<RoomState> = {
  syncSettings: (state, payload) => {
    state.private = payload.private
  },
}

export default mutations
