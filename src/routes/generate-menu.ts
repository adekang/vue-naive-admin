import type { MenuOption } from 'naive-ui'
import type { RouteRecordRaw } from 'vue-router'

export const generateMenu = (routes: RouteRecordRaw[]) => {
  const menus: MenuOption[] = []
  for (const route of routes) {
    const currentMenu: MenuOption = {
      key: route.path,
      label: route.meta?.title,
    }

    if (route.children && route.children.length > 0)
      currentMenu.children = generateMenu(route.children)

    menus.push(currentMenu)
  }

  return menus
}
