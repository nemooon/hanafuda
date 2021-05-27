import { InjectionKey } from 'vue'
import { createStore, createLogger, useStore as baseUseStore, Store } from 'vuex'
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import { RootState } from './types';
import { auth } from './Auth';
import { chat } from './Chat';

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore () {
  return baseUseStore(key);
}

const state: RootState = {
  version: '0.0.2',
};

export const store = createStore<RootState>({
  plugins,
  modules: {
    auth,
    chat,
  },
  strict: debug,
  state,
  getters,
  actions,
  mutations,
});
