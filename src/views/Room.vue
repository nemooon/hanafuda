<template>
  <div class="fixed inset-safe flex flex-col bg-white divide-y overflow-hidden">
    <header class="flex-none px-safe h-12 md:h-9 text-lg md:text-xs">
      <div class="flex items-center px-3 h-full">
        <div class="md:flex-1 w-10 md:w-auto">
          <div class="hidden md:flex items-center justify-start">
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
          </div>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-center space-x-1">
            <div v-if="me">
              <span class="font-bold">{{ me.name }}</span> 対 <span class="font-bold">プレイヤー</span>
            </div>
          </div>
        </div>
        <div class="md:flex-1 w-10 md:w-auto">
          <div class="flex md:hidden items-center justify-end">
            <a class="inline-flex items-center px-1 py-1 rounded hover:bg-gray-100" href="#" @click.prevent="toggleMenu">
              <svg v-if="menu" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
          <div class="hidden md:flex items-center justify-end">
            <div>
              <a class="flex items-center justify-center px-2 py-1 rounded hover:bg-gray-100" href="#" title="退出" @click.prevent="exit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                </svg>
                <span class="ml-1">退出</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="relative flex-1 px-safe h-full">
      <transition name="fade">
        <div v-if="menu" class="absolute inset-0 z-30 divide-y bg-white">
          <div class="py-3">
            <div class="px-4 py-3 font-bold text-xl">こいこい！</div>
            <div class="">
              <a class="flex items-center px-4 py-2 text-lg" href="#" @click.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                </svg>
                <span class="flex-none ml-4 mr-auto">ルーム名</span>
                <span class="mx-4 text-base opacity-70 truncate">#{{ room }}</span>
                <span class="flex-none"><i class="fas fa-chevron-right"></i></span>
              </a>
            </div>
            <div class="">
              <a class="flex items-center px-4 py-2 text-lg" href="#" @click.prevent="">
                <span class="flex-none">
                  <i v-if="settings.private" class="fas fa-lock fa-fw"></i>
                  <i v-else class="fas fa-unlock fa-fw"></i>
                </span>
                <span class="flex-none ml-4 mr-auto">公開設定</span>
                <span class="mx-4 text-base opacity-70 truncate">{{ settings.private ? 'プライベート' : 'オープン'}}</span>
                <span class="flex-none"><i class="fas fa-chevron-right"></i></span>
              </a>
            </div>
            <div class="">
              <a class="flex items-center px-4 py-2 text-lg" href="#" @click.prevent="">
                <span class="flex-none"><i class="fas fa-user-edit fa-fw"></i></span>
                <span class="flex-none ml-4 mr-auto">ニックネーム</span>
                <span class="flex-auto mx-4 text-base opacity-70 truncate">{{ me?.name }}</span>
                <span class="flex-none"><i class="fas fa-chevron-right"></i></span>
              </a>
            </div>
          </div>
          <div class="py-3">
            <div class="">
              <a class="flex items-center px-4 py-2 text-lg" href="#" @click.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span class="flex-none ml-4 mr-auto">遊びかた</span>
                <span class="flex-none"><i class="fas fa-chevron-right"></i></span>
              </a>
            </div>
            <div class="">
              <a class="flex items-center px-4 py-2 text-lg" href="#" @click.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span class="flex-none ml-4 mr-auto">出来役一覧</span>
                <span class="flex-none"><i class="fas fa-chevron-right"></i></span>
              </a>
            </div>
          </div>
          <div class="py-3">
            <div class="">
              <a class="flex items-center px-4 py-2 text-lg" href="#" @click.prevent="">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                </svg>
                <span class="flex-none ml-4 mr-auto">退出</span>
                <span class="flex-none"><i class="fas fa-chevron-right"></i></span>
              </a>
            </div>
          </div>
          <div class="py-3">
            <div class="px-4 py-2 text-sm">{{ version }}</div>
          </div>
        </div>
      </transition>
      <div class="flex flex-col md:flex-row h-full divide-x">
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
import Chat from '@/components/Chat.vue'
import CardList from '@/components/CardList.vue'

type ViewState = {
  menu: boolean,
}

export default defineComponent({
  components: {
    Chat,
    CardList,
  },
  setup() {
    const route = useRoute()

    const room = computed(() => route.params.room)

    const store = useStore()
    const version = computed(() => store.state.version)
    const me = computed(() => store.getters['auth/user'])
    const settings = computed(() => store.getters['room/settings'])

    const state = reactive<ViewState>({
      menu: false,
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
      toggleMenu: () => {
        state.menu = !state.menu
      },
      exit: () => {
        router.push({ name: 'start' })
      }
    }

  },
})
</script>
