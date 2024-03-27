<template>
  <q-card
    flat
    :class="{'bg-grey-3':!$q.dark.isActive}"
    class="q-pa-md full-height"
  >
    <p class="text-h6">
      Range
    </p>
    <div class="row">
      <div class="col">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                RANGE
              </q-item-label>
              <q-item-label class="text-bold">
                {{ range.distance }} {{ range.unit }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                STEP
              </q-item-label>
              <q-item-label class="text-bold">
                {{ range.step }} {{ range.unit }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                ZERO
              </q-item-label>
              <q-item-label class="text-bold">
                {{ zero.distance }} {{ zero.unit }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { useCalculatorStore } from 'stores/calculator'
import { storeToRefs } from 'pinia'

const calculatorStore = useCalculatorStore()
const { range, zero } = storeToRefs(calculatorStore)

</script>
