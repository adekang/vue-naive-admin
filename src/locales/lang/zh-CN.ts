import { dateZhCN, zhCN } from 'naive-ui'
import global from './global/zh-CN'
import pages from './pages/zh-CN'

export default {
  ...pages,
  ...global,
  naiveUI: {
    locale: zhCN,
    dateLocale: dateZhCN
  }
}
