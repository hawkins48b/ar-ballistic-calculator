<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer
      v-if="$q.platform.is.desktop"
      v-model="drawer"
      no-swipe-close
      persistent
      no-swipe-open
      behavior="desktop"
    >
      <div
        class="cursor-pointer"
        @click="$router.push('/')"
      >
        <div class="row items-center q-gutter-md">
          <div class="col-auto q-pt-sm q-pl-sm">
            <q-avatar>
              <q-img
                src="~/assets/zro-logo.svg"
                style="height: 40px"
                fit="fill"
              />
            </q-avatar>
          </div>
          <div class="col">
            <div class="text-h6 q-pt-sm">
              ZRO Ballistic
            </div>
          </div>
        </div>
      </div>

      <MenuList class="q-mt-sm" />
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
import { useQuasar } from 'quasar'

const $q = useQuasar()

const drawer = true

</script>
<style lang="scss">
q-router-link--active .q-icon {
  color:$primary !important

}
</style>
