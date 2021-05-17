<template>
  <img v-if="open" class="card" :src="image" :alt="title">
  <div class="card bg-black"></div>
</template>

<style scoped>
.card {
  width: 122px;
  height: 200px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: String,
    title: String,
    month: Number,
    image: String,
    open: Boolean,
  },
  // setup(props) {
  //   console.log(props)
  // },
})
</script>
