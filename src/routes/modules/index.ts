import Dashboard from '@/routes/modules/dashboard'

const Home = () => import('@/pages/index.vue')

export default {
  Home,
  ...Dashboard,
}
