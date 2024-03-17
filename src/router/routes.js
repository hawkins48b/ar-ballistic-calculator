const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: () => import('pages/Dashboard.vue') },
      { path: 'profiles', component: () => import('pages/ProfilesPage.vue') },
      { path: 'calculator', component: () => import('pages/CalculatorPage.vue') },
      { path: 'settings', component: () => import('pages/SettingsPage.vue') },
      { path: 'about', component: () => import('pages/AboutPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
