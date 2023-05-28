import { fileURLToPath } from 'url'
import { log } from 'console'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/

const baseUrl = fileURLToPath(new URL('./src', import.meta.url))
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  log('env', env)
  return {
    base: './',
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
      vueJsx(),
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
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true,
          ws: false,
          // 将前缀api替换为空字符串
          rewrite: path => path.replace(new RegExp(`^${env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
  }
})
