<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-2 gap-y-8 place-items-center">
    <div v-for="(card, i) in cards" :key="i">
      <card v-bind="card"></card>
      <div class="mt-2 text-xs text-center">{{ card.month }}月 {{ card.title }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from './Card.vue';
import cards from '../hanafuda/cards';

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    return {
      cards,
    }
  },
})
</script>
