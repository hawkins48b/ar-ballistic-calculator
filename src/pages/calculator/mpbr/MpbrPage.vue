<template>
  <div>
    <div class="row">
      <div class="col-auto">
        <q-btn
          flat
          to="/calculator"
          icon="arrow_back"
        />
      </div>
      <div class="col-auto text-h6 q-pl-md">
        Maximum Point Blank Range
      </div>
    </div>
    <!-- Profiles -->
    <ProfileCard class="q-mt-md" />
    <div class="row q-mt-xs q-col-gutter-md items-stretch">
      <div
        class="col-xs-12 col-sm-6"
      >
        <AtmosphereCard />
      </div>
    </div>
  </div>
</template>

<script setup>
// imports
import ProfileCard from 'components/calculator/ballistic/ProfileCard.vue'
import AtmosphereCard from 'components/calculator/ballistic/AtmosphereCard.vue'
import { useBallisticStore } from 'stores/ballistic'
// import { computed } from 'vue'

// options
// ballistic store
const ballisticStore = useBallisticStore()
ballisticStore.$reset() // reset store
// const showCalcResult = computed(() => ballisticStore.profileId)
</script>
