<script lang="ts" setup>
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@vicons/antd'
import type { Component, VNodeChild } from '@vue/runtime-core'
import { NIcon } from 'naive-ui'
import type { DropdownOption } from 'naive-ui'
import SelectLang from '../select-lang/index.vue'
import SelectUser from '../select-user/index.vue'
import Notify from '../notify/index.vue'
import { useUserStore } from '@/store/user'
import { useAppLocale } from '@/compsables/auto-lang'

const { t } = useI18n()
const appLocale = useAppLocale()
const userStore = useUserStore()

const avatar = computed(() => userStore.userInfo?.avatar)
const nickName = computed(
  () => userStore.userInfo?.nickname ?? userStore.userInfo?.username
)
const renderIcon = (icon: Component): VNodeChild =>
  h(NIcon, null, {
    default: () => h(icon)
  })
const userOptions = ref<DropdownOption[]>([
  {
    label: () => t('global.layout.header.right.user.center'),
    key: 'user-center',
    icon: () => renderIcon(UserOutlined)
  },
  {
    label: () => t('global.layout.header.right.user.setting'),
    key: 'user-setting',
    icon: () => renderIcon(SettingOutlined)
  },
  {
    key: 'header-divider',
    type: 'divider'
  },
  {
    label: () => t('global.layout.header.right.logout'),
    icon: () => renderIcon(LogoutOutlined),
    key: 'logout'
  }
])

const handleSelect = (value: string) => {
  if (value === 'logout') userStore.logout()
}
</script>

<template>
  <n-space align="center" size="large">
    <Notify />
    <SelectUser
      :avatar="avatar"
      :options="userOptions"
      :nickname="nickName"
      @select="handleSelect"
    />
    <SelectLang v-model:value="appLocale" />
  </n-space>
</template>
