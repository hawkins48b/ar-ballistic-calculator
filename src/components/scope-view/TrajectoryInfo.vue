<template>
  <div
    v-if="scopeViewStore.getTrajectory"
    class="row q-mt-md"
  >
    <div class="col text-center">
      <q-icon
        name="alarm"
        size="lg"
      />
      <div class="text-h7">
        Flight time
      </div>
      <div class="text-h5">
        {{ Math.round(scopeViewStore.getTrajectory.time * 100) / 100 }}s
      </div>
    </div>
    <div
      v-if="scopeViewStore.range.unit === 'YD'"
      class="col text-center"
    >
      <q-icon
        name="last_page"
        size="lg"
      />
      <div class="text-h7">
        Energy
      </div>
      <div class="text-h5">
        {{ Math.round(scopeViewStore.getTrajectory.energy.In(BC.Unit.FootPound)) }} FT / LB
      </div>
    </div>
    <div
      v-if="scopeViewStore.range.unit === 'M'"
      class="col text-center"
    >
      <q-icon
        name="last_page"
        size="lg"
      />
      <div class="text-h7">
        Energy
      </div>
      <div class="text-h5">
        {{ Math.round(scopeViewStore.getTrajectory.energy.In(BC.Unit.Joule)) }} J
      </div>
    </div>
    <div
      v-if="scopeViewStore.range.unit === 'YD'"
      class="col text-center"
    >
      <q-icon
        name="speed"
        size="lg"
      />
      <div class="text-h7">
        Terminal velocity
      </div>
      <div class="text-h5">
        {{ Math.round(scopeViewStore.getTrajectory.velocity.In(BC.Unit.MPH)) }} MPH
      </div>
    </div>
    <div
      v-if="scopeViewStore.range.unit === 'M'"
      class="col text-center"
    >
      <q-icon
        name="speed"
        size="lg"
      />
      <div class="text-h7">
        Terminal velocity
      </div>
      <div class="text-h5">
        {{ Math.round(scopeViewStore.getTrajectory.velocity.In(BC.Unit.MPS)) }} M/S
      </div>
    </div>
  </div>
</template>

<script setup>

import { useScopeViewStore } from 'stores/scopeview'
import * as BC from 'js-ballistics'

const scopeViewStore = useScopeViewStore()

</script>
