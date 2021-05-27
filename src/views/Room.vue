<template>
  <div class="fixed inset-safe flex flex-col bg-white divide-y overflow-hidden">
    <header class="flex-none px-safe h-9 text-xs">
      <div class="flex items-center px-3 h-full">
        <div class="md:flex-1 flex items-center justify-start">
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
        <div class="flex-1 flex items-center justify-center space-x-1">
          <div>
            <span class="font-bold">{{ me.name }}</span> <span class="text-2xs">対</span> <span class="font-bold">プレイヤー</span>
          </div>
        </div>
        <div class="md:flex-1 flex items-center justify-end">
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
    </header>
    <div class="relative flex-1 px-safe h-full">
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
    <footer class="flex-none px-safe h-6 text-xs">
      <div class="flex items-stretch justify-between h-full">
        <div class="flex space-x-1">
          <a class="flex items-center px-2 hover:bg-gray-100" href="#" @click.prevent="">
            <span class="mr-1 font-bold">#{{ room }}</span>
            <svg v-if="true" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
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
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from '@/store'
import { router } from '@/router'
import { useRoute } from 'vue-router'
import Chat from '@/components/Chat.vue'
import CardList from '@/components/CardList.vue'

export default defineComponent({
  components: {
    Chat,
    CardList,
  },
  setup() {
    const route = useRoute()

    const room = computed(() => route.params.room)

    const store = useStore()
    const me = computed(() => store.getters['auth/user'])

    onMounted(() => {
    })

    return {
      room,
      me,
      exit: () => {
        router.push({ name: 'start' })
      }
    }

  },
})
</script>
