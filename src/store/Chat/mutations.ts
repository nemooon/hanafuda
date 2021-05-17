import { MutationTree } from 'vuex';
import { ChatState, Sender, Message } from './types';

const mutations: MutationTree<ChatState> = {
  init: (state, payload) => {
    state.messages = payload.messages
  },
  typing: (state, payload) => {
    if (payload.typing) {
      if (state.typing.indexOf(payload.sender) === -1) {
        state.typing.push(payload.sender)
      }
    } else {
      if (state.typing.indexOf(payload.sender) !== -1) {
        state.typing = state.typing.filter((s: Sender) => s !== payload.sender);
      }
    }
  },
  add: (state, payload) => {
    state.messages.push({
      id: payload.id,
      date: payload.date,
      sender: payload.sender,
      body: payload.body,
    });
    state.messages.sort((a, b) => a.date.getTime() - b.date.getTime());
    state.typing = state.typing.filter((s: Sender) => s !== payload.sender);
  },
  remove: (state, id: string) => {
    state.messages = state.messages.filter((e: Message) => e.id !== id);
  },
};

export default mutations;
