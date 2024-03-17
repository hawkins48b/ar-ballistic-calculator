<template>
  <q-list>
    <q-item
      v-for="(item, index) in menuList"
      :key="index"
      clickable
      :to="item.path"
      active-class="bg-primary text-white"
    >
      <q-item-section
        avatar
        side
      >
        <q-icon
          :name="item.icon"
        />
      </q-item-section>
      <q-item-section>
        {{ item.label }}
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  setup () {
    return {
    }
  },
  data () {
    return {
      menuList: [
        {
          path: '/dashboard',
          icon: 'eva-grid-outline',
          label: 'Dashboard'
        },
        {
          path: '/profiles',
          icon: 'eva-list-outline',
          label: 'Profiles'
        },
        {
          path: '/calculator',
          icon: 'eva-layers-outline',
          label: 'Calculator'
        },
        {
          path: '/settings',
          icon: 'eva-settings-2-outline',
          label: 'Settings'
        },
        {
          path: '/about',
          icon: 'eva-info-outline',
          label: 'About'
        }
      ]
    }
  },
  mounted () {
    console.log()
  },
  methods: {
  }

}
</script>
