const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/profiles' },
      {
        path: 'profiles',
        meta: { title: 'Profiles' },
        children: [
          { path: '', component: () => import('pages/profiles/ProfilesPage.vue'), name: 'profiles', meta: { title: 'Profiles' } },
          {
            path: 'ammunitions',
            meta: { title: 'Ammunitions' },
            children: [
              { path: '', component: () => import('pages/profiles/ammunitions/AmmunitionPage.vue'), name: 'ammunitions', meta: { title: 'Ammunitions' } },
              { path: 'add', component: () => import('pages/profiles/ammunitions/AddAmmunitionPage.vue'), name: 'add-ammunition', meta: { title: 'Add ammunition' } },
              { path: 'edit/:ammunitionId', component: () => import('pages/profiles/ammunitions/EditAmmunitionPage.vue'), name: 'edit-amunition', meta: { title: 'Edit ammunition' } }
            ]
          },
          {
            path: 'optics',
            meta: { title: 'Optics' },
            children: [
              { path: '', component: () => import('pages/profiles/optics/OpticsPage.vue'), name: 'optics', meta: { title: 'Optics' } },
              { path: 'add', component: () => import('pages/profiles/optics/AddOpticPage.vue'), name: 'add-optic', meta: { title: 'Add optic' } },
              { path: 'edit/:opticId', component: () => import('pages/profiles/optics/EditOpticPage.vue'), name: 'edit-optic', meta: { title: 'Edit optic' } }
            ]
          },
          {
            path: 'firearms',
            meta: { title: 'Firearms' },
            children: [
              { path: '', component: () => import('pages/profiles/firearms/FirearmsPage.vue'), name: 'firearms', meta: { title: 'Firearms' } },
              { path: 'add', component: () => import('pages/profiles/firearms/AddFirearmPage.vue'), name: 'add-firearm', meta: { title: 'Add Firearm' } },
              { path: 'edit/:firearmId', component: () => import('pages/profiles/firearms/EditFirearmPage.vue'), name: 'edit-firearm', meta: { title: 'Edit firearm' } }
            ]
          },
          {
            path: 'setups',
            meta: { title: 'Setups' },
            children: [
              { path: '', component: () => import('pages/profiles/setups/SetupsPage.vue'), name: 'setups', meta: { title: 'Setups' } },
              { path: 'add', component: () => import('pages/profiles/setups/AddSetupPage.vue'), name: 'add-setup', meta: { title: 'Add setup' } },
              { path: 'edit/:setupId', component: () => import('pages/profiles/setups/EditSetupPage.vue'), name: 'edit-setup', meta: { title: 'Edit setup' } }
            ]
          }
        ]
      },
      {
        path: 'calculators',
        meta: { title: 'Calculators' },
        children: [
          { path: '', component: () => import('pages/calculators/ListCalculatorsPage.vue'), name: 'calculators', meta: { title: 'Calculators' } },
          { path: 'ballistic', component: () => import('pages/calculators/ballistic/BallisticPage.vue'), name: 'ballistic-calculator', meta: { title: 'Ballistic calculator' } },
          { path: 'maximum-point-blank-range', component: () => import('pages/calculators/mpbr/MpbrPage.vue'), name: 'mpbr', meta: { title: 'Maximum point blank range' } },
          { path: 'trajectory-validation', component: () => import('pages/calculators/trajectory-validation/TrajectoryValidationPage.vue'), name: 'trajectory-validation', meta: { title: 'Trajectory validation' } },
          { path: 'compare-trajectories', component: () => import('pages/calculators/compare-trajectories/CompareTrajectoriesPage.vue'), name: 'compare-trajectories', meta: { title: 'Compare trajectories' } },
          { path: 'dope-cards', component: () => import('pages/calculators/dope-cards/DopeCardsPage.vue'), name: 'generate-dope-cards', meta: { title: 'Generate dope cards' } }
        ]
      },
      { path: 'scopeview', component: () => import('pages/ScopeViewPage.vue'), name: 'scope-view', meta: { title: 'Scope view' } },
      {
        path: 'settings',
        meta: { title: 'Settings' },
        children: [
          { path: '', component: () => import('pages/settings/SettingsPage.vue'), name: 'settings', meta: { title: 'Settings' } },
          { path: 'about', component: () => import('pages/settings/AboutPage.vue'), name: 'about', meta: { title: 'About us' } },
          { path: 'privacy-policy', component: () => import('pages/settings/PrivacyPolicyPage.vue'), name: 'privacy-policy', meta: { title: 'Privacy policy' } }
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
