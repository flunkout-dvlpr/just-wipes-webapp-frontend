
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Profile',
        path: '/',
        component: () => import('pages/Profile.vue'),
        children: [
          {
            name: 'SignIn',
            path: '',
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
