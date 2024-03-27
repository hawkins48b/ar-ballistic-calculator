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
        </a>
      </div>
    </q-drawer>

    <q-page-container>
      <div class="row justify-start lt-md ">
        <div class="">
          <q-btn
            class="q-ma-md"
            flat
            round
            icon="menu"
            @click="leftDrawerOpen = true"
          />
        </div>
        <div class=" text-h3 q-mt-sm">
          ZRO
        </div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import MenuList from 'components/layout/MenuList.vue'

const leftDrawerOpen = ref(true)

</script>
<style lang="scss">
q-router-link--active .q-icon {
  color:$primary !important

}
</style>
