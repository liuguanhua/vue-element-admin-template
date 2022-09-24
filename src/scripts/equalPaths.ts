

import { LOGIN_PATH } from "./constant";

class equalPaths {
  isCurrentPagePath(path: string) {
    const { pathname } = window.location;
    return Object.is(path, pathname);
  }
  get isLogin() {
    return this.isCurrentPagePath(LOGIN_PATH);
  }
}

export default new equalPaths();
