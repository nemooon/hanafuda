import { ActionTree } from 'vuex';
import { getAuth, onAuthStateChanged, signInAnonymously, updateProfile } from "firebase/auth";
import { socket } from '@/socket';
import { RootState } from '@/store/types';
import { AuthState, User } from './types';
import { parseISO } from 'date-fns'

const auth = getAuth()

const actions: ActionTree<AuthState, RootState> = {

  signIn: async ({ commit }) => {
    onAuthStateChanged(auth, user => {
      if (user) {
        commit('signin', user)
      } else {
        // commit('singout')
      }
    })
    signInAnonymously(auth);
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
