import { createApp } from 'vue'
import App from './App.vue'
import './tailwind.css'

const app = createApp(App)

const components = import.meta.globEager('./components/**/*.vue')
for (const key in components) {
  app.component(key.split('/').pop().split('.')[0], components[key].default)
}

app.mount('#app')
