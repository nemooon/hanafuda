import { TwitterAuthProvider, UserInfo } from '@firebase/auth';
import { MutationTree } from 'vuex';
import { AuthState, User } from './types';

const mutations: MutationTree<AuthState> = {

  signin: (state, { user }) => {
    state.init = true
    state.me = {
      name: user.displayName,
      uid: user.uid,
      twitter: user.providerData.find((userInfo: UserInfo) => {
        return userInfo.providerId == TwitterAuthProvider.PROVIDER_ID
      }),
    }
  },
  
  singout: (state) => {
    state.init = true
    state.me = null
  },

  nickname: (state, payload) => {
    if (state.me != null) {
      state.me.name = payload.nickname
    }
  },

};

export default mutations;
