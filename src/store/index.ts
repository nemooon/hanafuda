import { InjectionKey } from 'vue'
import { createStore, createLogger, useStore as baseUseStore, Store } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { RootState } from './types'
import { auth } from './auth'
import { rooms } from './rooms'
import { room } from './room'
import { version } from 'package.json'

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export const key: InjectionKey<Store<RootState>> = Symbol()

export function useStore () {
  return baseUseStore(key)
}

const state: RootState = {
  version,
}

export const store = createStore<RootState>({
  plugins,
  modules: {
    auth,
    rooms,
    room,
  },
  strict: debug,
  state,
  getters,
  actions,
  mutations,
})
