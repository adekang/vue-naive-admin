import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [],
  safelist: [
    'bg-[var(--base-color)]',
    'bg-[var(--inverted-color)]',
    'h-75%',
    'h-100%',
    'bottom-0',
  ],
  presets: [
    presetUno(), // 默认wind预设
    presetAttributify(), // class拆分属性预设
    presetTypography(), // 排版预设
    presetIcons({ // 图标库预设
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({ // 网络字体预设
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerVariantGroup(), // windi CSS的变体组功能
    transformerDirectives(), //  @apply @screen theme()转换器
  ],
})
