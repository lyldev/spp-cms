// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/home',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'home',
    authority: ['super', 'alliance', 'museum', 'station'],
    children: [
      {
        name: '监控页',
        path: '/dashboard/monitor',
      },
    ],
  },
  {
    name: '场馆管理',
    path: '/site',
    icon: 'edit',
    authority: ['super', 'alliance', 'museum', 'station'],
    children: [
      { name: '展教联盟管理', path: '/site/allianceedit', authority: ['super', 'alliance'] },
      { name: '特色场馆管理', path: '/site/MuseumEdit', authority: ['super', 'museum'] },
      { name: '教学管理站管理', path: '/site/stationedit', authority: ['super', 'station'] },
    ],
  },
  {
    name: '资讯管理',
    path: '/post',
    icon: 'copy',
    authority: ['super', 'alliance', 'museum', 'station'],
    children: [
      { name: '资讯列表', path: '/post/list' },
      { name: '添加资讯', path: '/post/create' },
    ],
  },
  {
    name: '课程管理',
    path: '/curriculum',
    icon: 'creative',
    authority: ['super', 'station'],
    children: [
      { name: '课程列表', path: '/curriculum/list' },
      { name: '添加课程', path: '/curriculum/create' },
    ],
  },
  {
    name: '🔔 提醒服务',
    path: '/WarnList',
    // icon: 'bell',
    authority: ['super', 'station'],
  },
  {
    name: '分类管理',
    path: '/cate',
    icon: 'cascades',
    authority: ['super'],
    children: [
      { name: '分类列表', path: '/cate/list' },
      { name: '添加分类', path: '/cate/create' },
    ],
  },
  {
    name: '管理员管理',
    path: '/users',
    icon: 'yonghu',
    authority: 'super',
    children: [
      { name: '管理员列表', path: '/users/list' },
      { name: '添加管理员', path: '/users/create' },
    ],
  },
  {
    name: '通用设置',
    path: '/setting',
    icon: 'shezhi',
    authority: ['super', 'alliance', 'museum', 'station'],
    children: [
      { name: '基础设置', path: '/setting/basic' },
      {
        name: '菜单设置',
        path: '/setting/navigation',
      },
    ],
  },

];

export { headerMenuConfig, asideMenuConfig };
