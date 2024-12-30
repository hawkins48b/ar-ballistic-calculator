<template>
  <q-layout view="lHh lpR fFf">
    <q-header>
      <q-toolbar
        class="bg-grey-3"
        :class="{'bg-grey-10':$q.dark.isActive, 'text-black':!$q.dark.isActive}"
      >
        <q-btn
          class="q-ma-md"
          flat
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>{{ $route.name }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
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
        <div class="row items-center no-wrap">
          <div class="col text-h6">
            <q-img
              src="~/assets/zro-logo.svg"
              style="height: 40px"
              fit="fill"
            />Ballistic calculator
          </div>
        </div>
      </div>

      <MenuList class="q-mt-sm" />

      <div class="row justify-center q-mt-md">
        <div class="col-auto">
          <DarkModeToggle
            label="Dark mode"
          />
        </div>
      </div>
      <div class="text-center q-mt-md">
        by <a
          href="https://chocolate-warfare.com"
          target="_blank"
        >Chocolate Warfare
        </a>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import MenuList from 'components/layout/MenuList.vue'
import DarkModeToggle from 'components/settings/darkModeToggle.vue'

const leftDrawerOpen = ref(true)

</script>
<style lang="scss">
q-router-link--active .q-icon {
  color:$primary !important

}
</style>
