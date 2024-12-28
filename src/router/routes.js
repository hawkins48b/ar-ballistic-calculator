const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      { path: '', redirect: '/dashboard' },
      { path: 'dashboard', component: () => import('pages/DashboardPage.vue'), name: 'Dashboard' },
      {
        path: 'profiles',
        component: () => import('pages/ProfilesPage.vue'),

        children: [
          { path: '', component: () => import('pages/profiles/ListProfilesPage.vue'), name: 'Profiles' },
          { path: 'add', component: () => import('pages/profiles/AddProfilePage.vue'), name: 'Add profile' },
          { path: 'edit/:profileId', component: () => import('pages/profiles/EditProfilePage.vue'), name: 'Edit profile' }
        ]
      },
      {
        path: 'calculators',
        component: () => import('pages/CalculatorsPage.vue'),
        children: [
          { path: '', component: () => import('pages/calculators/ListCalculatorsPage.vue'), name: 'Calculators' },
          { path: 'ballistic', component: () => import('pages/calculators/ballistic/BallisticPage.vue'), name: 'Balistic calculator' },
          { path: 'maximum-point-blank-range', component: () => import('pages/calculators/mpbr/MpbrPage.vue'), name: 'Maximum point blank range' },
          { path: 'trajectory-validation', component: () => import('pages/calculators/trajectory-validation/TrajectoryValidationPage.vue'), name: 'Trajectory validation' },
          { path: 'compare-trajectories', component: () => import('pages/calculators/compare-trajectories/CompareTrajectoriesPage.vue'), name: 'Compare trajectories' },
          { path: 'dope-cards', component: () => import('pages/calculators/dope-cards/DopeCardsPage.vue'), name: 'Generate dope cards' }
        ]
      },
      { path: 'scopeview', component: () => import('pages/ScopeViewPage.vue'), name: 'Scope View' },
      { path: 'about', component: () => import('pages/AboutPage.vue'), name: 'About' }
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
