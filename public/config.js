window.APP_CONFIG = (function () {
  /**apiRoot
   * 1、配置'/'，则使用vite.config.ts中配置的代理 默认
   * 2、为空不配置则使用模拟数据
   * 3、自定义接口地址
   */
  return {
    apiRoot: '/',
    title: 'vue admin',
    logo: '/static/logo.png',
    projectLink: 'https://github.com/liuguanhua/vue-element-admin-template',
  }
})();
