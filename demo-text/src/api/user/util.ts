/**
 * 获取路由名称
 *
 * @param menu 菜单信息
 * @return 路由名称
 */
export const getRouteName = (menu) => {
  let routerName = menu.router_path.replace(/^\w/, (c) => c.toUpperCase());
  // 非外链并且是一级目录（类型为目录）
  if (isMenuFrame(menu)) {
    routerName = '';
  }
  return routerName;
};

/**
 * 是否为菜单内部跳转
 *
 * @param menu 菜单信息
 * @return 结果
 */
const isMenuFrame = (menu): boolean => {
  return menu.parent_id === 0 && menu.type === '1' && menu.is_frame === '1';
};
