
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Home.vue'),
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
      },
      {
        name: 'Profile',
        path: '/profile',
        component: () => import('pages/Profile.vue')
        // children: [
        //   {
        //     name: 'Scanner',
        //     path: '/profile',
        //     component: () => import('components/Scanner.vue')
        //   }
        // ]
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
