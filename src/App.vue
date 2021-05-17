<template>
  <div class="relative grid grid-cols-app grid-rows-app place-content-center w-screen h-screen bg-gray-100">
    <game></game>
    <chat></chat>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computed, onMounted, reactive, toRefs } from "@vue/runtime-core";
import { useStore } from './store'
import CardList from './components/CardList.vue'
import DecideDealer from './components/DecideDealer.vue'
import Game from './components/Game.vue'
import Chat from './components/Chat.vue'

// interface State {
//   input: string,
//   messages: any,
// }

export default defineComponent({
  components: {
    // CardList,
    // DecideDealer,
    Game,
    Chat,
  },
  setup() {
    // const store = useStore()

    // const state = reactive({
    //   input: "",
    //   messages: computed(() => store.getters.messages),
    // } as State);

    return {
      // ...toRefs(state),
      // send(): void {
      //   store.dispatch('send', state.input)
      //   state.input = "";
      // },
    };
  },
});
</script>