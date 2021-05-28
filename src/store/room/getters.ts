import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { RoomState } from './types'

const getters: GetterTree<RoomState, RootState> = {
  settings: (state: RoomState) => {
    return {
      private: state.private,
    }
  },
}

export default getters
