// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Dashboard from './pages/Dashboard';
import PostList from './pages/PostList';
import CreatePost from './pages/CreatePost';
import CurriculumList from './pages/CurriculumList';
import CreateCurriculum from './pages/CreateCurriculum';

import CateList from './pages/CateList';
import CreateCate from './pages/CreateCate';

import UserList from './pages/UserList';
import CreateUser from './pages/CreateUser';
import EditPassword from './pages/EditPassword';
import BasicSetting from './pages/BasicSetting';

import AllianceEdit from './pages/AllianceEdit';
import MuseumEdit from './pages/MuseumEdit';
import StationEdit from './pages/StationEdit';

import WarnList from './pages/WarnList';
import NavigationSetting from './pages/NavigationSetting'; // 这个路径是组件的文件路径

const routerConfig = [
  {
    path: '/users/create', // 这个path是浏览器访问的path
    component: CreateUser,
  },
  {
    path: '/users/pwd',
    component: EditPassword,
  },
  {
    path: '/dashboard/monitor',
    component: Dashboard,
  },
  {
    path: '/setting/basic',
    component: BasicSetting,
  },
  {
    path: '/setting/navigation',
    component: NavigationSetting,
  },
  {
    path: '/users/list',
    component: UserList,
  },
  {
    path: '/user/login',
    component: UserLogin,
  },
  {
    path: '/user/register',
    component: UserRegister,
  },
  {
    path: '/cate/list',
    component: CateList,
  },
  {
    path: '/cate/create',
    component: CreateCate,
  },
  {
    path: '/post/list',
    component: PostList,
  },
  {
    path: '/post/create',
    component: CreatePost,
  },
  {
    path: '/curriculum/list',
    component: CurriculumList,
  },
  {
    path: '/curriculum/create',
    component: CreateCurriculum,
  },
  {
    path: '/site/allianceedit',
    component: AllianceEdit,
  },
  {
    path: '/site/MuseumEdit',
    component: MuseumEdit,
  },
  {
    path: '/site/stationedit',
    component: StationEdit,
  },
  {
    path: '/WarnList',
    component: WarnList,
  },
];

export default routerConfig;
