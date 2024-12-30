<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">
        Dope cards
      </div>
    </q-card-section>
    <q-card-section>
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-expansion-item
          expand-separator
          label="Mid range dope chart"
        >
          <q-card>
            <q-card-section>
              The mid-range dope chart is designed for red dot rifles from 0 to 500y or 500m.
            </q-card-section>
            <q-card-actions>
              <q-btn
                color="primary"
                @click="dopeCardsStore.downloadARdatasheetImperial()"
              >
                Imperial
              </q-btn>
              <q-btn
                color="primary"
                @click="dopeCardsStore.downloadARdatasheetMetric()"
              >
                Metric
              </q-btn>
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useDopeCardsStore } from 'stores/dopecards'

// set calculation profile
const dopeCardsStore = useDopeCardsStore()

</script>
