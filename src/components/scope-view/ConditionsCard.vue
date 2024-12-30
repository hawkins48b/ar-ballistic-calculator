<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        <q-icon
          name="tune"
          size="lg"
          class="q-mr-sm"
        />
        Conditions
      </div>
    </q-card-section>
    <q-card-section>
      <RangeForm />
      <q-list
        bordered
        class="q-mt-md"
      >
        <q-expansion-item
          expand-separator
          icon="arrow_outward"
          label="Elevation angle"
          class="q-pa-md"
        >
          <ElevationAngleForm />
          <br>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="air"
          label="Wind"
          class="q-pa-md"
        >
          <WindForm />
          <br>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="cloud"
          label="Atmospheric conditions"
          class="q-pa-md"
        >
          <AtmosphereForm />
          <br>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import RangeForm from 'components/scope-view/RangeForm.vue'
import AtmosphereForm from 'components/scope-view/AtmosphereForm.vue'
import WindForm from 'components/scope-view/WindForm.vue'
import ElevationAngleForm from 'components/scope-view/ElevationAngleForm.vue'

</script>
