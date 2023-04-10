import { fileURLToPath } from 'url'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
// https://vitejs.dev/config/

const baseUrl = fileURLToPath(new URL('./src', import.meta.url))
export default defineConfig({
  resolve: {
    alias: {
      '@': baseUrl,
    },
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: false,
    __VUE_I18N_LEGACY_API__: false,
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    Unocss(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        'vue-i18n',
        '@vueuse/core',
        'pinia',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar',
          ],
        },
      ],
      // 生成到的地址
      dts: 'types/auto-imports.d.ts',
      // 配置本地需要自动导入的库
      dirs: [
        // pinia状态管理目录
        'src/stores',
        // 自定义组合式api目录
        'src/composables',
      ],
    }),
    Components({
      // 导入naiveui的配置项目
      resolvers: [NaiveUiResolver()],
      // 生成类型的地址
      dts: 'types/components.d.ts',
      dirs: [
        'src/components',
      ],
    }),
  ],
})
