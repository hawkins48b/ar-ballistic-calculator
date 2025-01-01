const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [

      { path: '', redirect: '/profilesv2' },
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
        path: 'profilesv2',
        children: [
          { path: '', component: () => import('pages/profiles/ProfilesV2Page.vue'), name: 'ProfilesV2' },
          { path: 'ammunition', component: () => import('pages/profiles/ammunitions/AmmunitionPage.vue'), name: 'Ammunition' },
          { path: 'ammunition/add', component: () => import('pages/profiles/ammunitions/AddAmmunitionPage.vue'), name: 'New Ammunition' },
          { path: 'ammunition/edit/:ammunitionId', component: () => import('pages/profiles/ammunitions/EditAmmunitionPage.vue'), name: 'Edit Ammunition' },
          { path: 'optics', component: () => import('pages/profiles/optic/OpticsPage.vue'), name: 'Optics' },
          { path: 'optics/add', component: () => import('pages/profiles/optic/AddOpticPage.vue'), name: 'Add Optic' },
          { path: 'optics/edit/:opticId', component: () => import('pages/profiles/optic/EditOpticPage.vue'), name: 'Edit Optic' }
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
      {
        path: 'settings',
        children: [
          { path: '', component: () => import('pages/settings/SettingsPage.vue'), name: 'Settings' },
          { path: 'about', component: () => import('pages/settings/AboutPage.vue'), name: 'About' },
          { path: 'privacy-policy', component: () => import('pages/settings/PrivacyPolicyPage.vue'), name: 'Privacy policy' }
        ]
      }
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
