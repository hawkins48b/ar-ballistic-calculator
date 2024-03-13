<template>
  <q-layout view="lHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          ZeroIQ
        </q-toolbar-title>

        <q-btn
          flat
          round
          href="https://chocolate-warfare.com"
          tag="a"
          target="_blank"
        >
          <q-img
            src="~assets/cw-logo.svg"
            style="height: 25px;width:30px"
          />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Navigate
        </q-item-label>
      </q-list>
      <MenuList />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import MenuList from 'components/layout/MenuList.vue'
import { LocalStorage } from 'quasar'

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuList
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
  mounted () {
    // set theme
    this.$q.dark.set(JSON.parse(LocalStorage.getItem('settings.darkMode')))
  }
})
</script>
