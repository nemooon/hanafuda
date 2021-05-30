import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { RoomState } from './types'

const getters: GetterTree<RoomState, RootState> = {
  roomId: (state: RoomState) => {
    return state.roomId
  },
  settings: (state: RoomState) => {
    return {
      id: state.id,
      name: state.name,
      private: state.private,
    }
  },
}

export default getters
