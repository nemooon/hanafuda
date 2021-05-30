<template>
  <div class="fixed inset-safe flex items-center justify-center bg-gray-100 overflow-hidden">
    <transition name="fade" mode="out-in">
      <div v-if="initialized" class="flex flex-col items-center justify-center p-10 w-80 rounded bg-white shadow">
        <div class="mb-8 text-3xl text-gray-700 text-center font-bold">
          こいこい！
        </div>
        <form v-if="authenticate" class="w-full" @submit.prevent="start">
          <datalist id="rooms">
            <option v-for="room in rooms" :key="room" :value="room" />
          </datalist>
          <div class="space-y-3">
            <div>
              <label class="flex items-baseline mb-1 w-full text-xs text-gray-600">
                <div>Twitterアカウント</div>
                <a class="ml-auto text-2xs" href="#" @click.prevent="signOut">ログアウト</a>
              </label>
              <div class="flex items-center px-3 py-2 w-full rounded border md:text-sm outline-none appearance-none">
                <div class="-ml-1 -my-1">
                  <img class="rounded-full w-6 h-6" :src="me.twitter.photoURL" alt="">
                </div>
                <div class="ml-2">{{ me.twitter.displayName }}</div>
              </div>
            </div>
            <div>
              <label class="block mb-1 w-full text-xs text-gray-600">プレイヤーネーム</label>
              <input class="block px-3 py-2 w-full rounded border md:text-sm outline-none appearance-none" type="text" v-model="nickname">
            </div>
            <div>
              <label class="block mb-1 w-full text-xs text-gray-600">ルーム</label>
              <input class="block px-3 py-2 w-full rounded border md:text-sm outline-none appearance-none" type="text" v-model="roomname" autocomplete="on" list="rooms">
            </div>
          </div>
          <div class="mt-8">
            <button class="block px-3 py-2 w-full rounded text-sm text-center text-white outline-none appearance-none" :class="startable ? 'bg-blue-600' : 'bg-gray-300'" type="submit" :disabled="!startable">スタート</button>
          </div>
        </form>
        <div v-else class="w-48">
          <div class="space-y-3">
            <button class="block px-3 py-2 w-full rounded text-sm text-center text-white font-bold outline-none appearance-none bg-twitter" @click="signInTwitter"><i class="fab fa-twitter"></i> Twitterではじめる</button>
          </div>
        </div>
        <div class="mt-4 text-xs text-gray-400 text-center">
          version {{ version }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { computed, onBeforeUnmount, onMounted, reactive, toRefs, watch } from "@vue/runtime-core";
import { useStore } from '@/store'
import { router } from '@/router'

type ComponentState = {
  nickname: string,
  roomname: string,
}

export default defineComponent({
  setup() {
    const store = useStore()
    const version = computed(() => store.state.version)
    const initialized = computed(() => store.getters['auth/initialized'])
    const authenticate = computed(() => store.getters['auth/authenticate'])
    const me = computed(() => store.getters['auth/user'])
    const rooms = computed(() => store.state.rooms.list)

    const state = reactive<ComponentState>({
      nickname: me.value ? me.value.name : '',
      roomname: '',
    })

    const startable = computed(() => state.nickname != '' && state.roomname != '')

    store.dispatch('rooms/connect')

    onBeforeUnmount(() => {
      store.dispatch('rooms/disconnect')
    })

    watch(authenticate, (authenticate) => {
      if (authenticate) {
        state.nickname = me.value ? me.value.name : ''
      }
    })

    return {
      ...toRefs(state),
      startable,
      version,
      initialized,
      authenticate,
      me,
      rooms,
      signInTwitter: () => store.dispatch('auth/signInTwitter'),
      signOut: () => store.dispatch('auth/signOut'),
      start: () => {
        if (state.nickname != '') {
          store.dispatch('auth/nickname', { nickname: state.nickname })
          router.push({ name: 'room', params: { room: state.roomname } })
        }
      }
    };
  },
});
</script>