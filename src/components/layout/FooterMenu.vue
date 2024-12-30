<template>
  <div class="q-pl-md q-pr-md q-pb-md">
    <q-card>
      <q-tabs
        active-color="primary"
        no-caps
        class="nav-card"
      >
        <q-route-tab
          label="Profiles"
          to="/profilesv2"
          icon="list"
          class="text-h5"
        />
        <q-route-tab
          label="Calculators"
          to="/calculators"
          icon="calculate"
        />
        <q-route-tab
          label="Scope view"
          to="/scopeview"
          icon="visibility"
        />
        <q-route-tab
          label="Settings"
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
