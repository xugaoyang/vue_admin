import Vue from 'vue'
import _ from 'lodash'
import Layout from '@/components/layout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/models/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'test',
        name: 'test',
        component: () => {
          return import('@/views/Test/Test')
        },
        meta: { title: '测试' },
      },
      {
        path: 'testSide',
        name: 'testSide',
        component: () => {
          return import('@/views/Test/TestSide')
        },
        meta: { title: '测试11' },
      },
    ],
  },
  {
    path: '/home',
    redirect: '/test',
  },
  {
    path: '/login',
    component: () => {
      return import('@/views/Login/Login')
    },
  },
  {
    path: '/404',
    component: () => {
      return import('@/views/ErrorPage/404')
    },
  },
  {
    path: '/401',
    component: () => {
      return import('@/views/ErrorPage/401')
    },
  },
  {
    path: '/error',
    component: Layout,
    name: 'ErrorPages',
    children: [
      {
        path: '401',
        component: () => {
          return import('@/views/ErrorPage/401')
        },
        name: '401',
        meta: { title: '401' },
      },
      {
        path: '404',
        component: () => {
          return import('@/views/ErrorPage/404')
        },
        name: '404',
        meta: { title: '404' },
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
  },
]

const router = new VueRouter({
  scrollBehavior: () => {
    return { y: 0 }
  },
  routes,
})

NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 获取token,判断登录状态，如果登录重定向到首页
  const { token } = store.state.Auth
  if (token) {
    console.log(to)
    if (to.path === '/login' && _.isNull(to.query)) {
      next({ path: '/test' })
      NProgress.done()
    }
  }
  next()
  NProgress.done()
})

router.afterEach((to) => {
  NProgress.done()
  console.log('router to', to)

  if (_.includes(['/login', '/', '/404', '/401'], to.fullPath)) return
  const displayName = to.meta ? to.meta.title : '404'
  const { fullPath, hash, meta, name, params, path, query } = to
  const tag = {
    fullPath,
    hash,
    meta,
    name,
    params,
    path,
    query,
    displayName,
  }

  const pageTags = store.getters['Theme/pageTags']
  const exist = _.find(pageTags, { displayName })
  if (!exist) {
    store.dispatch('Theme/addTag', tag)
  }
  store.dispatch('Theme/currentTag', tag)
  store.dispatch('Theme/latestPath', to.fullPath)
})

export default router
