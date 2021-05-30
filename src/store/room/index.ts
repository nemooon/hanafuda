import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { messages } from './messages'
import { RoomState } from './types'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state: RoomState = {
  roomId: '',
  id: '',
  name: '',
  private: false,
  menu: false,
}

export const room: Module<RoomState, RootState> = {
  namespaced: true,
  modules: {
    messages,
  },
  state,
  getters,
  actions,
  mutations,
}
