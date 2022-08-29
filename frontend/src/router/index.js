import { createRouter, createWebHistory } from 'vue-router'
import UserIndex from '../views/users/UserIndex.vue'
import UserCreate from '../views/users/UserCreate.vue'
import UserEdit from '../views/users/UserEdit.vue'

import RoleIndex from '../views/roles/RoleIndex.vue'
import RoleCreate from '../views/roles/RoleCreate.vue'
import RoleEdit from '../views/roles/RoleEdit.vue'

import UserLogin from '../views/UserLogin.vue'
import UserLayout from '../components/UserLayout.vue'
import AuthLayout from '../components/AuthLayout.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    redirect: '/',
    name: 'Home',
    component: UserLayout,
    meta: { requiredAuth: true },
    children: [
      { path: '/', name: 'Home', component: UserIndex },
      { path: '/users/create', name: 'users.create', component: UserCreate },
      { path: '/users/:id', name: 'users.edit', component: UserEdit },

      { path: '/roles', name: 'roles.index', component: RoleIndex },
      { path: '/roles/create', name: 'roles.create', component: RoleCreate },
      { path: '/roles/:id', name: 'roles.edit', component: RoleEdit },
    ]
  },
  {
    path: '/auth',
    redirect: '/UserLogin',
    name: 'Auth',
    component: AuthLayout,
    meta: { isGuest: true },
    children: [
      {
        path: '/login',
        name: 'UserLogin',
        component: UserLogin
      },
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuth && !store.state.user.token) {
    next({ name: 'UserLogin' })
  }
  else if (store.state.user.token && (to.meta.isGuest)) {
    next({ name: 'Home' });
  }
  else {
    next();
  }
})

export default router
