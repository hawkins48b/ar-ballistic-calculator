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
            Show more options
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
                Wind conditions
              </q-toggle>
            </div>
            <div>
              <q-toggle
                v-model="options.showVelocityGraph"
              >
                Velocity graph
              </q-toggle>
            </div>
            <div>
              <q-toggle
                v-model="options.showShotAngle"
              >
                Shot angle
              </q-toggle>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            flat
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
import { useCalculatorStore } from 'stores/calculator'
import { ref, watch } from 'vue'

// calculator store
const calculatorStore = useCalculatorStore()

// options
const {
  options
} = storeToRefs(calculatorStore)

// dialog open/close
const dialog = ref(false)

// if we hide atmospheric conditions, use International Standard Atmosphere ISA
watch(() => options.value.showAtmospheric, (newValue) => {
  if (!newValue) {
    calculatorStore.atmosphere.useISA = true
  }
}
)
</script>
