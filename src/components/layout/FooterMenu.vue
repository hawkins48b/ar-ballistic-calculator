<template>
  <div class="q-pl-sm q-pr-sm q-pb-sm">
    <q-card>
      <q-tabs
        active-color="primary"
        no-caps
        class="nav-card"
        indicator-color="transparent"
      >
        <q-route-tab
          to="/profilesv2"
          icon="list"
          class="text-h5"
        />
        <q-route-tab
          to="/calculators"
          icon="calculate"
        />
        <q-route-tab
          to="/scopeview"
          icon="visibility"
        />
        <q-route-tab
          to="/settings"
          icon="settings"
        />
      </q-tabs>
    </q-card>
  </div>
</template>

<script setup>

</script>

<style lang="scss">
.dark-menu {
  background-color: $dark-menu;
}
.light-menu {
  background-color: $light-menu;
}
</style>
