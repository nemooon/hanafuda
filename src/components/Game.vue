<template>
  <div class="bg-white">
  </div>
</template>

<style lang="postcss" scoped>
</style>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useStore } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore()

    // const log = ref<HTMLElement|null>(null)
    // const logScroll = () => {
    //   log.value.scrollTop = log.value.scrollHeight
    // }

    onMounted(() => {
      // logScroll()
    })

    return {
      // log,
      // messages,
      // format,
    }

  },
})
</script>
