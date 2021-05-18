<template>
  <transition name="fade" mode="out-in">
    <div v-if="started == false" class="flex items-center justify-center w-screen h-screen bg-gray-100">
      <transition name="fade" mode="out-in">
        <div v-if="authenticate" class="flex flex-col items-center justify-center p-10 rounded bg-white shadow">
          <div class="mb-8 text-3xl text-gray-700 text-center font-bold">
            こいこい！
          </div>
          <form class="w-48" @submit.prevent="start">
            <div class="space-y-3">
              <div>
                <label class="block mb-1 w-full text-xs text-gray-600">プレイヤーネーム</label>
                <input class="block px-3 py-2 w-full rounded border md:text-sm text-center outline-none appearance-none" type="text" v-model="nickname">
              </div>
              <div>
                <label class="block mb-1 w-full text-xs text-gray-600">ルーム</label>
                <input class="block px-3 py-2 w-full rounded border md:text-sm text-center outline-none appearance-none" type="text" v-model="roomname">
              </div>
            </div>
            <div class="mt-8">
              <button class="block px-3 py-2 w-full rounded text-sm text-center text-white outline-none appearance-none" :class="startable ? 'bg-blue-600' : 'bg-gray-300'" type="submit" :disabled="!startable">スタート</button>
            </div>
          </form>
          <div class="mt-4 text-xs text-gray-400 text-center">
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
  <div v-if="authenticate" class="absolute left-3 top-3">
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
      roomname: '',
    })

    const startable = computed(() => state.nickname != '' && state.roomname != '')

    const version = computed(() => store.state.version)
    const started = computed(() => store.state.started)

    const authenticate = computed(() => store.getters['auth/authenticate'])
    const me = computed(() => store.state.auth.me)
    store.dispatch('auth/signIn')

    watch(authenticate, (authenticate) => {
      if (authenticate) {
        state.nickname = me.value ? me.value.name : ''
      }
    })

    return {
      ...toRefs(state),
      startable,
      version,
      started,
      authenticate,
      me,
      start: () => {
        if (state.nickname != '') {
          store.dispatch('auth/nickname', { nickname: state.nickname })
          store.dispatch('start')
        }
      }
    };
  },
});
</script>