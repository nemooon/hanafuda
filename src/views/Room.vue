<template>
  <div class="fixed inset-safe flex flex-col bg-white divide-y overflow-hidden">
    <header class="flex-none px-safe h-12 md:h-9 text-lg md:text-xs">
      <div class="flex items-center px-3 h-full">
        <div class="md:flex-1 w-10 md:w-auto">
          <!-- <div class="hidden md:flex items-center justify-start">
            <div class="mr-2 font-bold text-sm">こいこい！</div>
            <div>
              <a class="inline-flex items-center px-2 py-1 rounded hover:bg-gray-100" href="#" @click.prevent="">
                遊びかた
              </a>
            </div>
            <div>
              <a class="inline-flex items-center px-2 py-1 rounded hover:bg-gray-100" href="#" @click.prevent="">
                出来役一覧
              </a>
            </div>
          </div> -->
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-center space-x-1">
            <div v-if="me">
              <span class="font-bold">{{ me.name }}</span> 対 <span class="font-bold">プレイヤー</span>
            </div>
          </div>
        </div>
        <div class="md:flex-1 w-10 md:w-auto">
          <div class="flex items-center justify-end">
            <a class="inline-flex items-center px-1 py-1 rounded hover:bg-gray-100" href="#" @click.prevent="toggleMenu">
              <svg v-if="menu" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
    <div class="relative flex-1 px-safe h-full">
      <transition name="fade">
        <div v-if="menu" class="absolute inset-0 z-30 p-4 md:p-10 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg overflow-auto">
          <room-menu></room-menu>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="initialized" class="flex flex-col md:flex-row h-full divide-x">
          <main class="relative flex-1">
            <div class="absolute inset-0">
              <card-list></card-list>
            </div>
          </main>
          <aside class="relative flex-none h-40 md:w-80 md:h-auto">
            <div class="absolute inset-0">
              <chat :room="room"></chat>
            </div>
          </aside>
        </div>
      </transition>
    </div>
    <footer class="flex-none px-safe h-7 text-xs">
      <div class="flex items-stretch justify-between h-full">
        <div class="flex space-x-1">
          <a class="flex items-center px-2 hover:bg-gray-100" href="#" @click.prevent="">
            <span class="mr-1 font-bold">#{{ room }}</span>
          </a>
          <a class="flex items-center px-2 hover:bg-gray-100" href="#" @click.prevent="">
            <i v-if="settings.private" class="fas fa-lock fa-fw"></i>
            <i v-else class="fas fa-unlock fa-fw"></i>
          </a>
          <a class="flex items-center px-2 hover:bg-gray-100" href="#" @click.prevent="">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
          </a>
          <a class="flex items-center px-2 hover:bg-gray-100" href="#" @click.prevent="">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            <span class="ml-1">0</span>
          </a>
        </div>
        <div class="flex space-x-1">
          <a v-if="me" class="flex items-center px-2 hover:bg-gray-100" href="#" @click.prevent="">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <span class="ml-1">{{ me.name }}</span>
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="postcss" scoped>
</style>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useStore } from '@/store'
import { router } from '@/router'
import { useRoute } from 'vue-router'
import RoomMenu from '@/components/RoomMenu.vue'
import Chat from '@/components/Chat.vue'
import CardList from '@/components/CardList.vue'

type ViewState = {
  menu: boolean,
  init: boolean,
}

export default defineComponent({
  components: {
    RoomMenu,
    Chat,
    CardList,
  },
  setup() {
    const route = useRoute()

    const room = computed(() => route.params.room)

    const store = useStore()
    const version = computed(() => store.state.version)
    const me = computed(() => store.getters['auth/user'])
    const roomId = computed(() => store.getters['room/roomId'])
    const settings = computed(() => store.getters['room/settings'])

    const state = reactive<ViewState>({
      menu: computed(() => store.state.room.menu),
      initialized: computed(() => roomId.value != ''),
    })

    store.dispatch('room/connect', room.value)

    onMounted(() => {
    })

    return {
      ...toRefs(state),
      room,
      version,
      me,
      settings,
      toggleMenu: () => store.dispatch('room/toggleMenu'),
      exit: () => {
        router.push({ name: 'start' })
      }
    }

  },
})
</script>
