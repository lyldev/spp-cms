import RenderAuthorized from 'ant-design-pro/lib/Authorized';
import { getAuthority } from './authority';

let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// 更新权限
const reloadAuthorized = () => {
  Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
