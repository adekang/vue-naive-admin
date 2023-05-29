import Dashboard from '@/routes/modules/dashboard'
import Menu from '@/routes/modules/menu'

const Home = () => import('@/pages/index.vue')

export default {
  Home,
  ...Dashboard,
  ...Menu
}
