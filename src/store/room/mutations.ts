import { MutationTree } from 'vuex'
import { RoomState } from './types'

const mutations: MutationTree<RoomState> = {
  syncSettings: (state, payload) => {
    state.roomId = payload.roomId
    state.id = payload.id
    state.name = payload.name
    state.private = payload.private
  },
  menu: (state, payload) => {
    state.menu = payload
  },
}

export default mutations
