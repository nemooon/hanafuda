<template>
  <img class="card" :src="image" :alt="title">
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
  },
  // setup(props) {
  //   console.log(props)
  // },
})
</script>
