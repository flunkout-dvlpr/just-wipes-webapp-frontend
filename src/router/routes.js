
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('pages/Home.vue'),
        children: [
          {
            path: '',
            component: () => import('components/SignIn')
          },
          {
            name: 'SignUp',
            path: 'sign-up',
            component: () => import('components/SignUp')
          }
        ]
      },
      {
        name: 'profile',
        path: '/profile',
        component: () => import('pages/Profile.vue')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
