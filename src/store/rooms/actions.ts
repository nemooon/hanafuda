import { ActionTree } from 'vuex'
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { db } from '@/firebase'
import { RootState } from '@/store/types'
import { RoomsState } from './types'

const actions: ActionTree<RoomsState, RootState> = {

  fetch: async ({ commit }) => {
    const q = query(collection(db, 'rooms'), where('private', '==', false))
    const docs = await getDocs(q)
    const rooms: string[] = docs.docs.map(doc => doc.id)
    commit('sync', rooms)
  },

  connect: async ({ commit }) => {
    const q = query(collection(db, 'rooms'), where('private', '==', false))
    const unsubscribe = onSnapshot(q, async (collection) => {
      const rooms: string[] = collection.docs.map(doc => doc.id)
      commit('sync', rooms)
    })
    commit('connect', { unsubscribe })
  },

  disconnect: async ({ commit, state }) => {
    if (state.unsubscribe) {
      state.unsubscribe()
      commit('disconnect')
    }
  },

}

export default actions
