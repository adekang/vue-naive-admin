import { merge } from 'lodash-es'

// ReturnType 返回类型
interface GlobalConfigType {
  notification?: ReturnType<typeof useNotification>
  message?: ReturnType<typeof useMessage>
  dialog?: ReturnType<typeof useDialog>
  loadingBar?: ReturnType<typeof useLoadingBar>
}
const globalConfig: GlobalConfigType = {}

export const useGlobalConfig = (): GlobalConfigType => {
  return globalConfig
}

export const useGlobalConfigProvider = (config: GlobalConfigType) => {
  merge(globalConfig, config)
}
