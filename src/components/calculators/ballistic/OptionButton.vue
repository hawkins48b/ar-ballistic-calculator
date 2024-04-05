<template>
  <q-btn
    flat
    icon="more_vert"
    @click="dialog=true"
  >
    Options
    <q-dialog
      v-model="dialog"
    >
      <q-card
        :class="{'bg-grey-3':!$q.dark.isActive}"
        flat
        style=""
        class="q-pa-md"
      >
        <q-card-section>
          <p class="text-h3">
            Calculator Options
          </p>
        </q-card-section>
        <q-card-section>
          <p class="text-h6">
            Parameters
          </p>
          <q-form>
            <div>
              <q-toggle
                v-model="options.showAtmospheric"
              >
                Atmospheric conditions
              </q-toggle>
            </div>
            <div>
              <q-toggle
                v-model="options.showWindConditions"
              >
                Wind
              </q-toggle>
            </div>
            <div>
              <q-toggle
                v-model="options.showSightAdjustment"
              >
                Sight adjustment
              </q-toggle>
            </div>
          </q-form>
        </q-card-section>
        <q-card-section>
          <p class="text-h6">
            Graphs
          </p>
          <q-form>
            <div>
              <q-toggle
                v-model="options.showVelocityGraph"
              >
                Velocity
              </q-toggle>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            label="OK"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useBallisticStore } from 'stores/ballistic'
import { ref, watch } from 'vue'

// ballistic store
const ballisticStore = useBallisticStore()

// options
const {
  options
} = storeToRefs(ballisticStore)

// dialog open/close
const dialog = ref(false)

// if we hide atmospheric conditions, use International Standard Atmosphere ISA
watch(() => options.value.showAtmospheric, (newValue) => {
  if (!newValue) {
    ballisticStore.atmosphere.useISA = true
  }
})
</script>
