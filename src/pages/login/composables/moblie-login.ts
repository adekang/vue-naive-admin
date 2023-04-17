import type { FormInst, FormRules } from 'naive-ui'
import { userSendCodeApi } from '@/api/user'
import router from '@/routes'
import { useUserStore } from '@/store/user'
import type { UserMobileLoginParams } from '@/api/user'

export const useMobileLogin = () => {
  const mLoading = ref(false)
  const mModel = reactive<UserMobileLoginParams>({
    mobile: '',
    code: '',
    type: 'mobile',
  })
  const { t } = useI18n()
  const mFormRef = ref<FormInst>()
  const mRules = reactive<FormRules>({
    mobile: [
      {
        key: 'mobile',
        required: true,
        renderMessage: () => t('login.mobile.required'),
      },
      {
        key: 'mobile',
        pattern: /^1[3456789]\d{9}$/,
        renderMessage: () => t('login.mobile.rule'),
      },
    ],
    code: [
      {
        required: true,
        renderMessage: () => t('login.mobile.verification-code.required'),
      },
      {
        min: 6,
        max: 6,
        renderMessage: () => t('login.mobile.verification-code.rule'),
      },
    ],
  })
  const userStore = useUserStore()
  const counter = ref(120)
  const counterState = ref(false)
  const message = useMessage()

  const mLogin = async () => {
    mLoading.value = true
    try {
      // 2.校验表单是否正确
      await mFormRef.value?.validate()
      // 3.请求接口
      await userStore.login(mModel)
      // 4.请求成功设置token
      mLoading.value = false
      // 5.跳转到首页
      const redirect = router.currentRoute.value?.params?.redirect as string
      await router.push(redirect || '/')
      mLoading.value = false
    }
    catch (err) {
      mLoading.value = false
      console.error(err)
    }
  }

  const startCounter = () => {
    const timer = setInterval(() => {
      counter.value--
      if (counter.value === 0) {
        counterState.value = false
        clearInterval(timer)
      }
    }, 1000)
  }
  const sendCode = async () => {
    const mesIns = message.loading(t('login.mobile.verification-code.loading'))
    try {
      await mFormRef.value?.validate(undefined, rule => rule?.key === 'mobile')
      await userSendCodeApi({ mobile: mModel.mobile })
      counterState.value = true
      mesIns.destroy()
      message.success(t('login.mobile.verification-code.success'))
      startCounter()
    }
    catch (err) {
      mesIns.destroy()
      console.error(err)
    }
  }
  return {
    mLoading,
    mModel,
    mFormRef,
    counterState,
    counter,
    mLogin,
    sendCode,
    mRules,
  }
}
