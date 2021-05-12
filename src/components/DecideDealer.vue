<template>
  <div class="grid grid-cols-2 gap-10 h-64 place-items-center">
    <div v-for="(card, i) in dd.stage" :key="i">
      <card v-bind="card"></card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from './Card.vue';
import cards from '../hanafuda/cards';
import DecideDealer from '../hanafuda/DecideDealer';
import Player from '../hanafuda/Player';

export default defineComponent({
  components: {
    Card,
  },
  setup() {
    const player1 = new Player('プレイヤー1');
    const player2 = new Player('プレイヤー2');
    const dd = new DecideDealer([player1, player2]);
    // dd.choice(1)
    // dd.choice(0)
    // dd.decide()
    console.log(cards);
    return {
      dd,
    }
  },
})
</script>

<style lang="postcss" scoped>

</style>