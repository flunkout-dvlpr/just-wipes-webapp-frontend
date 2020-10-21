
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Home',
        path: '/',
        component: () => import('pages/Home.vue'),
        children: [
          {
            name: 'SignIn',
            path: 'sign-in',
            component: () => import('components/SignIn')
          },
          {
            name: 'SignUp',
            path: 'sign-up',
            component: () => import('components/SignUp')
          },
          {
            name: 'Verify',
            path: 'verify',
            params: true,
            component: () => import('components/VerifyOTP')
          }
        ]
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
