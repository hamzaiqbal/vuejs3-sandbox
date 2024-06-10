import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createI18n } from 'vue-i18n'
import en from '@/i18n/en.json'
import fr from '@/i18n/fr.json'

import './assets/index.css'

import App from '@/App.vue'
import Home from '@/pages/Home.vue'
import Create from '@/pages/Create.vue'
import { type MessageSchema } from '@/types/i18n'

const i18n = createI18n<[MessageSchema], 'en' | 'fr'>({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    fr,
  },
})

const routes = [
  { path: '/', component: Home },
  { path: '/create', component: Create },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.mount('#app')
