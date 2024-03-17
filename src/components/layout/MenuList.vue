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
          icon: 'apps',
          label: 'Dashboard'
        },
        {
          path: '/profiles',
          icon: 'list',
          label: 'Profiles'
        },
        {
          path: '/calculator',
          icon: 'calculate',
          label: 'Calculator'
        },
        {
          path: '/settings',
          icon: 'settings',
          label: 'Settings'
        },
        {
          path: '/about',
          icon: 'info',
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
