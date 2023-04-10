import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/routes'
import '@unocss/reset/tailwind.css'
import '@/assets/styles/index.css'
import 'uno.css'
import './style.css'
import i18n from '@/locales'

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
