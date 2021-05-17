import { InjectionKey } from 'vue'
import { createStore, createLogger, useStore as baseUseStore, Store } from 'vuex'
import { RootState } from './types';
import { chat } from './Chat';

const debug = process.env.NODE_ENV !== 'production'
const plugins = debug ? [createLogger({})] : []

export const key: InjectionKey<Store<RootState>> = Symbol();

export function useStore () {
  return baseUseStore(key);
}

export const store = createStore<RootState>({
  plugins,
  modules: {
    chat,
  },
  strict: debug,
  state: {
    version: '1.0.0',
  },
});
