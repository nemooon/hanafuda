import { ActionTree } from 'vuex'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { RootState } from '@/store/types'
import { RoomState } from './types'
import { parseISO } from 'date-fns'

const actions: ActionTree<RoomState, RootState> = {

  connect: async ({ commit }, roomId: string) => {
    onSnapshot(doc(db, 'rooms', roomId), (doc) => {
      if (doc.exists()) {
        commit('syncSettings', doc.data())
      } else {
        setDoc(doc.ref, {
          private: false,
        })
      }
    })
  },

}

export default actions
