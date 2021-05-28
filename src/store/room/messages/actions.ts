import { ActionTree } from 'vuex'
import { collection, addDoc, doc, getDoc, onSnapshot, query, serverTimestamp, orderBy } from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { RootState } from '@/store/types'
import { MessagesState } from './types'
import { parseISO } from 'date-fns'

const actions: ActionTree<MessagesState, RootState> = {

  connect: async ({ commit }, room: string) => {
    const q = query(collection(db, `rooms/${room}/messages`), orderBy('receive_at'))
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const messages: object[] = []
      await Promise.all(querySnapshot.docs.map(async doc => {
        const message = doc.data()
        const user = (await getDoc(message.user)).data()
        messages.push({
          id: message.id,
          date: message.receive_at ? message.receive_at.toDate() : new Date(),
          sender: user,
          body: message.body,
        })
      }))
      commit('sync', messages)
    })
    commit('connect', { room, unsubscribe })
  },

  disconnect: async ({ commit, state }) => {
    if (state.unsubscribe) {
      state.unsubscribe()
      commit('disconnect')
    }
  },

  say: async ({ state }, message: string) => {
    if (state.room) {
      await addDoc(collection(db, `rooms/${state.room}/messages`), {
        receive_at: serverTimestamp(),
        user: doc(db, 'users/' + auth.currentUser?.uid),
        body: message,
      })
    }
  },

}

export default actions
