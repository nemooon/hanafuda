import { ActionTree } from 'vuex';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, TwitterAuthProvider, updateProfile } from "firebase/auth";
import { RootState } from '@/store/types';
import { AuthState, User } from './types';

const auth = getAuth()

const actions: ActionTree<AuthState, RootState> = {

  init: async ({ commit }) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        commit('signin', { user })
      } else {
        commit('singout')
      }
    })
  },

  signInTwitter: async ({ commit }) => {
    const provider = new TwitterAuthProvider()
    signInWithPopup(auth, provider).then(() => {}, error => {
      console.error(error)
    })
  },

  signOut: async ({ commit }) => {
    signOut(auth)
  },

  nickname: async ({ commit }, payload) => {
    const user = auth.currentUser

    if (user) {
      updateProfile(user, {
        displayName: payload.nickname,
      }).then(() => {
        commit('nickname', payload)
      })
    }
  },

};

export default actions;
