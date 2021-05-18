<template>
  <transition name="fade" mode="out-in">
    <div v-if="started == false" class="flex items-center justify-center w-screen h-screen bg-gray-100">
      <transition name="fade" mode="out-in">
        <div v-if="authenticate" class="flex flex-col items-center justify-center w-64 h-64 rounded-lg bg-white">
          <div class="mb-6 text-2xl text-gray-700 text-center font-bold">
            こいこい！
          </div>
          <div  class="w-48 h-24 space-y-4">
            <div>
              <input class="px-3 py-2 w-full rounded border md:text-sm text-center outline-none appearance-none" type="text" v-model="nickname" placeholder="プレイヤーネーム">
            </div>
            <div>
              <button class="px-3 py-2 w-full rounded bg-blue-600 text-sm text-center text-white outline-none appearance-none" @click.prevent="start">スタート</button>
            </div>
          </div>
          <div class="mt-6 text-xs text-gray-400 text-center">
            version {{ version }}
          </div>
        </div>
        <div v-else class=" text-xs text-gray-300">
          loading...
        </div>
      </transition>
    </div>
    <div v-else class="relative grid grid-cols-app grid-rows-app place-content-center w-screen h-screen bg-gray-100">
      <game></game>
      <chat></chat>
    </div>
  </transition>
  <div v-if="authenticate" class="absolute left-3 bottom-3">
    <div class="text-gray-500 text-xs">{{ me.name }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computed, onMounted, reactive, toRefs, watch } from "@vue/runtime-core";
import { useStore } from './store'
import Game from './components/Game.vue'
import Chat from './components/Chat.vue'

export default defineComponent({
  components: {
    Game,
    Chat,
  },
  setup() {
    const store = useStore()

    const state = reactive({
      nickname: '',
    })

    const version = computed(() => store.state.version)
    const started = computed(() => store.state.started)

    const authenticate = computed(() => store.getters['auth/authenticate'])
    const me = computed(() => store.state.auth.me)
    store.dispatch('auth/signIn')

    watch(authenticate, (authenticate) => {
      if (authenticate) {
        state.nickname = me.value.name
      }
    })

    return {
      ...toRefs(state),
      version,
      started,
      authenticate,
      me,
      start: () => {
        store.dispatch('auth/nickname', { nickname: state.nickname })
        store.dispatch('start')
      }
    };
  },
});
</script>