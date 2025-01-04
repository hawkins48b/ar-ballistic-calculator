const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/profiles' },
      {
        path: 'profiles',
        children: [
          { path: '', component: () => import('pages/profiles/ProfilesPage.vue'), name: 'Profiles' },
          { path: 'ammunitions', component: () => import('pages/profiles/ammunitions/AmmunitionPage.vue'), name: 'Ammunitions' },
          { path: 'ammunitions/add', component: () => import('pages/profiles/ammunitions/AddAmmunitionPage.vue'), name: 'New Ammunition' },
          { path: 'ammunitions/edit/:ammunitionId', component: () => import('pages/profiles/ammunitions/EditAmmunitionPage.vue'), name: 'Edit Ammunition' },
          { path: 'optics', component: () => import('pages/profiles/optics/OpticsPage.vue'), name: 'Optics' },
          { path: 'optics/add', component: () => import('pages/profiles/optics/AddOpticPage.vue'), name: 'Add Optic' },
          { path: 'optics/edit/:opticId', component: () => import('pages/profiles/optics/EditOpticPage.vue'), name: 'Edit Optic' },
          { path: 'firearms', component: () => import('pages/profiles/firearms/FirearmsPage.vue'), name: 'Firearms' },
          { path: 'firearms/add', component: () => import('pages/profiles/firearms/AddFirearmPage.vue'), name: 'Add Firearm' },
          { path: 'firearms/edit/:firearmId', component: () => import('pages/profiles/firearms/EditFirearmPage.vue'), name: 'Edit Firearm' },
          { path: 'setups', component: () => import('pages/profiles/setups/SetupsPage.vue'), name: 'Setups' },
          { path: 'setups/add', component: () => import('pages/profiles/setups/AddSetupPage.vue'), name: 'Add Setup' },
          { path: 'setups/edit/:setupId', component: () => import('pages/profiles/setups/EditSetupPage.vue'), name: 'Edit Setup' }
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
