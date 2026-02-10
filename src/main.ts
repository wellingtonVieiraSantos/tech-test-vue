import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'
import { createPinia } from 'pinia'
import { useDatabaseStore } from './store/database'


const pinia = createPinia()
const app = createApp(App)

app.use(router)

app.use(pinia)

useDatabaseStore().loadInitial()

app.mount('#app')
