import { dateEnUS, enUS } from 'naive-ui'
import global from './global/en-US'
import pages from './pages/en-US'

export default {
  ...pages,
  ...global,
  naiveUI: {
    locale: enUS,
    dateLocale: dateEnUS
  }
}
