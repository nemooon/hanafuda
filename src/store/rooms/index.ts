import { Module } from 'vuex'
import { RootState } from '@/store/types'
import { RoomsState } from './types'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state: RoomsState = {
  unsubscribe: null,
  list: [],
}

export const rooms: Module<RoomsState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
