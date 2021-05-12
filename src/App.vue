<template>
  <div class="w-screen h-screen">
    <decide-dealer></decide-dealer>
    <form class="flex space-x-3" @submit.prevent="send">
      <input v-model="input" class="px-4 py-3 border rounded" type="text" />
      <button type="submit" class="px-4 py-3 border rounded bg-blue-200">
        送信
      </button>
    </form>
    <div>
      <div v-for="(line, i) in messages" :key="i">
        {{ line }}
      </div>
    </div>
  </div>
  <div class="container mx-auto py-10">
    <div class="mt-20">
      <card-list></card-list>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computed, onMounted, reactive, toRefs } from "@vue/runtime-core";
import { useStore } from './store'
import CardList from './components/CardList.vue'
import DecideDealer from './components/DecideDealer.vue'

interface State {
  input: string,
  messages: any,
}

export default defineComponent({
  components: {
    CardList,
    DecideDealer,
  },
  setup() {
    const store = useStore()

    const state = reactive({
      input: "",
      messages: computed(() => store.getters.messages),
    } as State);

    return {
      ...toRefs(state),
      send(): void {
        store.dispatch('send', state.input)
        state.input = "";
      },
    };
  },
});
</script>