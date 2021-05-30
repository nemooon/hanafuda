<template>
  <div class="mx-auto md:w-96 min-h-full md:min-h-0 rounded-xl bg-white md:shadow-lg">
    <div class="py-2">
      <div class="flex items-center px-4 py-3 mb-3">
        <div class="mr-3">
          <img class="w-12 h-12 rounded-lg" src="../assets/logo.svg" alt="logo">
        </div>
        <div class="font-bold text-xl">こいこい！</div>
        <div class="ml-auto text-xs opacity-60">{{ version }}</div>
      </div>
      <div class="px-4 py-2 font-bold text-xs opacity-40">
        ルーム設定
      </div>
      <div class="">
        <a class="flex items-center px-4 py-2 text-lg md:text-base hover:bg-gray-100" href="#" @click.prevent="">
          <span class="flex-none mr-auto">部屋ID</span>
          <span class="flex-auto ml-4 text-right text-base opacity-50 truncate">{{ settings.id }}</span>
        </a>
      </div>
      <div class="">
        <a class="flex items-center px-4 py-2 text-lg md:text-base hover:bg-gray-100" href="#" @click.prevent="">
          <span class="flex-none mr-auto">部屋名</span>
          <span class="flex-auto ml-4 text-right text-base opacity-50 truncate">{{ settings.name }}</span>
        </a>
      </div>
      <div class="">
        <a class="flex items-center px-4 py-2 text-lg md:text-base hover:bg-gray-100" href="#" @click.prevent="">
          <span class="flex-none mr-auto">公開設定</span>
          <span class="flex-auto ml-4 text-right text-base opacity-50 truncate">{{ settings.private ? 'プライベート' : 'オープン'}}</span>
        </a>
      </div>
      <div class="">
        <a class="flex items-center px-4 py-2 text-lg md:text-base hover:bg-gray-100" href="#" @click.prevent="exit">
          <span class="flex-none mr-auto">退出</span>
          <span class="flex-none"><i class="fas fa-fw fa-door-open"></i></span>
        </a>
      </div>
    </div>
    <div class="py-2">
      <div class="px-4 py-2 font-bold text-xs opacity-40">
        プロフィール
      </div>
      <div class="">
        <a class="flex items-center px-4 py-2 text-lg md:text-base hover:bg-gray-100" href="#" @click.prevent="">
          <span class="flex-none mr-auto">ニックネーム変更
          </span>
          <span class="flex-auto ml-4 text-right text-base opacity-50 truncate">{{ me?.name }}</span>
        </a>
      </div>
    </div>
    <div class="py-2">
      <div class="px-4 py-2 font-bold text-xs opacity-40">
        ヘルプ
      </div>
      <div class="">
        <a class="flex items-center px-4 py-2 text-lg md:text-base hover:bg-gray-100" href="#" @click.prevent="">
          <span class="flex-none mr-auto">遊びかた</span>
          <span class="flex-none"><i class="far fa-xs fa-fw fa-clone"></i></span>
        </a>
      </div>
      <div class="">
        <a class="flex items-center px-4 py-2 text-lg md:text-base hover:bg-gray-100" href="#" @click.prevent="">
          <span class="flex-none mr-auto">出来役一覧</span>
          <span class="flex-none"><i class="far fa-xs fa-fw fa-clone"></i></span>
        </a>
      </div>
    </div>
    <div class="px-4 py-10 text-center text-sm">
      <a href="#" @click.prevent="close">閉じる</a>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue'
import { useStore } from '@/store'
import { router } from '@/router'
import { useRoute } from 'vue-router'

export default defineComponent({
  setup() {
    const store = useStore()
    const version = computed(() => store.state.version)
    const me = computed(() => store.getters['auth/user'])
    const settings = computed(() => store.getters['room/settings'])

    return {
      version,
      me,
      settings,
      close: () => store.dispatch('room/closeMenu'),
      exit: () => {
        router.push({ name: 'start' })
      }
    }

  },
})
</script>
