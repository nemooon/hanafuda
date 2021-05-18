<template>
  <div class="bg-gray-800">
    <div class="flex flex-col h-full">
      <div class="flex-none flex items-center px-3 py-2 border-b border-gray-600 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
        </svg>
        <div class="ml-1 text-xs">チャット</div>
      </div>
      <div ref="log" class="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div v-for="message in messages" :key="message.id" class="relative flex items-baseline text-white text-xs">
          <div class="mr-2 text-green-500">{{ message.sender.name }}</div>
          <div class="">{{ message.body }}</div>
          <div class="absolute right-0 top-0 text-opacity-50">{{ format(message.date, 'kk:mm') }}</div>
        </div>
        <div v-if="typing.length > 0" class="text-white text-xs">
          {{ typing.map(user => user.name).join(',') }}さんが入力中...
        </div>
      </div>
      <div class="flex-none border-t border-gray-600">
        <form @submit.prevent="say">
          <div class="relative">
            <input class="px-3 py-2 w-full h-11 text-white md:text-xs rounded-none bg-gray-800 outline-none appearance-none" v-model="message" type="text" placeholder="チャット入力..." @input="input">
            <div class="absolute right-3 top-3 flex items-center space-x-1">
              <button class="text-white text-xs outline-none appearance-none" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
</style>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useStore } from '@/store'
import { format } from 'date-fns'
import { Message } from '@/store/Chat/types'

export default defineComponent({
  setup() {
    const store = useStore()

    const state = reactive({
      message: '',
    })

    const log = ref<HTMLElement|null>(null)
    const logScroll = () => {
      nextTick(() => {
        if (log.value != null) {
          log.value.scrollTop = log.value.scrollHeight
        }
      })
    }

    const typing = computed(() => store.state.chat.typing)
    const messages = computed(() => store.state.chat.messages)
    watch(messages.value, () => logScroll())

    onMounted(() => {
      store.dispatch('chat/connect')
      logScroll()
    })

    return {
      ...toRefs(state),
      log,
      typing,
      messages,
      format,
      say: () => {
        store.dispatch('chat/say', state.message)
        state.message = ''
      },
      input: () => {
        store.dispatch('chat/input', state.message != '')
      },
    }

  },
})
</script>
