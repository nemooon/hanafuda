import './firebase'
import { createApp } from 'vue'
import App from '@/App.vue'
import { store, key } from './store'
import { router } from './router'
import './tailwind.css'
import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App)

app.use(store, key)
app.use(router)

app.mount('#app')
