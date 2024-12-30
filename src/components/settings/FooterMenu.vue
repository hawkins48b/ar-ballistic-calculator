<template>
  <div class="q-pl-md q-pr-md q-pb-md">
    <ZroCard>
      <q-tabs
        active-color="primary"
        indicator-color="transparent"
        no-caps
        :class="{'text-black':!$q.dark.isActive}"
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
    </ZroCard>
  </div>
</template>

<script setup>
import ZroCard from 'components/zroCard.vue'

</script>

<style lang="scss">
.nav-card {
  background-color: $grey-9;
}
</style>
