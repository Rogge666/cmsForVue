import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const card = r => require.ensure([], () => r(require('@/page/card')), 'card');
const project = r => require.ensure([], () => r(require('@/page/project')), 'project');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: '/card',
          name: 'card',
          component: card,
          meta: ['系统管理', '卡片管理']
        },
        {
          path: '/project',
          name: 'project',
          component: project,
          meta: ['系统管理', '项目管理']
        },
      ]
    }
  ]
})
