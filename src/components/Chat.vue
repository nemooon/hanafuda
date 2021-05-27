<template>
  <div class="w-full h-full">
    <div class="flex flex-col h-full">
      <div class="relative flex-1">
        <div ref="log" class="absolute inset-0 overflow-y-auto scrollbar-log">
          <div class="flex flex-col justify-end px-2 py-4 min-h-full space-y-4">
            <div v-for="message in messages" :key="message.id" class="space-y-1">
              <div class="flex items-center text-xs">
                <div class="w-10 opacity-30">{{ format(message.date, 'kk:mm') }}</div>
                <div class="font-bold truncate">{{ message.sender.name }}</div>
              </div>
              <div class="pl-10 text-sm">{{ message.body }}</div>
            </div>
          </div>
        </div>
        <div v-if="messages.length == 0" class="absolute inset-0 flex items-center justify-center h-full">
          <div class="text-2xs opacity-30">まだメッセージはありません</div>
        </div>
        <div v-if="typing.length > 0" class="absolute inset-x-2 bottom-0 text-xs">
          {{ typing.map(user => user.name).join(',') }}さんが入力中...
        </div>
      </div>
      <div class="flex-none px-2 pb-2">
        <form @submit.prevent="say">
          <div class="relative border border-gray-200 rounded">
            <input class="px-3 py-2 w-full h-11 md:text-xs rounded-none bg-transparent outline-none appearance-none" v-model="message" type="text" :placeholder="`#${room} へのメッセージ`" @input="input">
            <div class="absolute right-3 top-3 flex items-center space-x-1">
              <button class="text-xs outline-none appearance-none" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" class="transform rotate-90 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
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
.scrollbar-log::-webkit-scrollbar {
  @apply w-2 h-2;
}
.scrollbar-log::-webkit-scrollbar-track {
  @apply m-1 bg-gray-100 rounded-full;
}
.scrollbar-log::-webkit-scrollbar-thumb {
  @apply m-1 bg-gray-300 rounded-full;
}
</style>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { useStore } from '@/store'
import { format } from 'date-fns'
import { Message } from '@/store/Chat/types'

export default defineComponent({
  props: {
    room: String,
  },
  setup(props) {
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
    watch(() => messages.value.length, () => logScroll())

    onMounted(() => {
      store.dispatch('chat/connect')
      logScroll()
    })

    return {
      ...props,
      ...toRefs(state),
      log,
      typing,
      messages,
      format,
      say: () => {
        store.dispatch('chat/input', false)
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
