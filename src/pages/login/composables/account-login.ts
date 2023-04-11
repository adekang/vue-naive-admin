import type { FormInst, FormRules } from 'naive-ui'
import { useUserStore } from '@/store/user'
import type { UserAccountLoginParams } from '@/api/user'

export const useAccountLogin = () => {
  // null 为naive ui的受控模式
  const model = reactive<UserAccountLoginParams>({
    username: null,
    password: null,
  })
  const formRef = ref<FormInst>()
  const { t } = useI18n()
  const rules = reactive<FormRules>({
    username: [
      {
        required: true,
        renderMessage: () => t('login.username.required'),
      },
      {
        min: 5,
        max: 20,
        renderMessage: () => t('login.username.length'),
      },
    ],
    password: [
      {
        required: true,
        renderMessage: () => t('login.password.required'),
      },
      {
        min: 5,
        max: 20,
        renderMessage: () => t('login.password.length'),
      },
    ],
  })
  const loading = ref(false)
  const useStore = useUserStore()
  const router = useRouter()
  const login = async () => {
    // 1.加载loading状态
    loading.value = true
    try {
      // 2.校验表单是否正确
      await formRef.value?.validate()
      // 3.请求接口
      await useStore.login(model)
      // 4.请求成功设置token
      loading.value = false
      // 5.跳转到首页
      const redirect = router.currentRoute.value?.params?.redirect as string
      await router.push(redirect || '/')
      loading.value = false
    }
    catch (err) {
      loading.value = false
      console.error(err)
    }
  }
  return {
    model,
    formRef,
    loading,
    rules,
    login,
  }
}
