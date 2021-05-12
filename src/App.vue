<template>
  <div class="container mx-auto py-10">
    <decide-dealer></decide-dealer>
    <!-- <form class="flex space-x-3" @submit.prevent="send">
      <input v-model="input" class="px-4 py-3 border rounded" type="text" />
      <button type="submit" class="px-4 py-3 border rounded bg-blue-200">
        送信
      </button>
    </form>
    <div>
      <div v-for="(line, i) in data" :key="i">
        {{ line }}
      </div>
    </div> -->
  </div>
</template>

<script>
import { io } from "socket.io-client";
import { onMounted, reactive, toRefs } from "@vue/runtime-core";

export default {
  components: {},
  setup() {
    const socket = io("http://nariya-mac-mini.local:3333");
    console.log(socket);

    const state = reactive({
      input: "",
      data: [],
    });

    onMounted(() => {
      socket.on("message", function (data, fn) {
        console.log(data, fn);
        state.data.push(data);
      });
    });

    return {
      ...toRefs(state),
      send(e) {
        state.data.push(state.input);
        socket.emit("new message", state.input);

        state.input = "";
      },
    };
  },
};
</script>