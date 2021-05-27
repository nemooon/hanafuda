import { createRouter, createWebHistory } from 'vue-router'

import Start from '@/views/Start.vue'
import Room from '@/views/Room.vue'

const routes = [
  { path: '/', name: 'start', component: Start },
  { path: '/room/:room', name: 'room', component: Room },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to, from) => {
  // const toDepth = to.path.split('/').length
  // const fromDepth = from.path.split('/').length
  // to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  to.meta.transitionName = 'fade'
})
