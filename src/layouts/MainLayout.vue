<template>
  <q-layout view="lHh lpR fFf">
    <q-drawer
      show-if-above
      class="desktop-only bg-grey-3"
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
    <q-footer
      class="mobile-only"
    >
      <FooterMenu />
    </q-footer>
  </q-layout>
</template>

<script setup>
import MenuList from 'components/layout/MenuList.vue'
import FooterMenu from 'src/components/layout/FooterMenu.vue'

</script>
<style lang="scss">
q-router-link--active .q-icon {
  color:$primary !important

}
</style>
