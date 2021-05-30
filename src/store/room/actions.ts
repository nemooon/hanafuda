import { ActionTree } from 'vuex'
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import { RootState } from '@/store/types'
import { RoomState } from './types'

const actions: ActionTree<RoomState, RootState> = {

  connect: async ({ commit }, id: string) => {
    const roomIdRef = doc(db, 'roomIds', id)
    const roomIdSnap = await getDoc(roomIdRef)
    if (roomIdSnap.exists()) {
      const roomId = roomIdSnap.data()
      const roomSnap = await getDoc(roomId.roomRef)
      if (roomSnap.exists()) {
        const room = roomSnap.data()
        commit('syncSettings', {
          roomId: roomSnap.id,
          id,
          name: room.name,
          private: room.private,
        })
      } else {
        // const room = {
        //   roomId: id,
        //   name: '部屋名',
        //   private: true,
        //   createdAt: serverTimestamp(),
        // }
        // const roomRef = await addDoc(collection(db, 'rooms'), room)
        // await setDoc(roomIdSnap.ref, {
        //   roomRef,
        //   createdAt: serverTimestamp(),
        // })
      }
    } else {
      const room = {
        roomId: roomIdRef,
        id,
        name: '部屋名',
        private: true,
        createdAt: serverTimestamp(),
      }
      const roomRef = await addDoc(collection(db, 'rooms'), room)
      await setDoc(roomIdSnap.ref, {
        roomRef,
        createdAt: serverTimestamp(),
      })
      commit('syncSettings', {
        roomId: roomRef.id,
        name: room.name,
        private: room.private,
      })
    }
  },

  openMenu: ({ commit, state }) => {
    if (state.menu == false) {
      commit('menu', true)
    }
  },

  closeMenu: ({ commit, state }) => {
    if (state.menu == true) {
      commit('menu', false)
    }
  },

  toggleMenu: ({ commit, state }) => {
    commit('menu', !state.menu)
  },

}

export default actions
