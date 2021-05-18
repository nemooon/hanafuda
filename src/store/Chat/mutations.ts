import { MutationTree } from 'vuex';
import { ChatState, Sender, Message } from './types';

const mutations: MutationTree<ChatState> = {
  init: (state, payload) => {
    state.messages = payload.messages
  },
  typing: (state, payload) => {
    const typing = state.typing.find((s: Sender) => s.user && s.user.uid == payload.sender.user.uid)
    if (payload.typing) {
      if (typing === undefined) {
        state.typing.push(payload.sender)
      }
    } else {
      if (typing !== undefined) {
        state.typing = state.typing.filter((s: Sender) => !s.user || s.user.uid !== payload.sender.user.uid);
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
