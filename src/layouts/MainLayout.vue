<template>
  <q-layout view="lHh lpR fFf">
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-grey-3"
      :class="{'bg-grey-10':$q.dark.isActive}"
    >
      <div
        class="text-center q-mt-md cursor-pointer"
        @click="$router.push('/')"
      >
        <div class="text-h3">
          ZRO
        </div>
        <div class="text-h6 text-italic ">
          Ballistic calculator
        </div>
      </div>

      <MenuList class="q-mt-sm" />
      <div class="text-center q-mt-md">
        by <a
          href="https://chocolate-warfare.com"
          target="_blank"
        >Chocolate Warfare
          <q-icon name="eva-diagonal-arrow-right-up-outline" /></a>
      </div>
    </q-drawer>

    <q-page-container>
      <q-btn
        class="lt-md q-ma-md"
        flat
        round
        icon="eva-menu-2-outline"
        @click="leftDrawerOpen = true"
      />
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
<style lang="scss">
q-router-link--active .q-icon {
  color:$primary !important

}
</style>
