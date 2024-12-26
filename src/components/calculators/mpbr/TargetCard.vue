<template>
  <zroCard>
    <q-card-section>
      <div class="text-h6">
        <q-icon
          name="photo_size_select_small"
          size="lg"
          class="q-mr-sm"
        />
        Target size
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-form>
        <q-input
          v-model="target.size"
          label="Size"
          filled
          step="any"
          type="number"
          lazy-rules
          :rules="[
            val => val && val > 0 || 'The target size must be positive'
          ]"
          class="q-mt-md"
          hint="Recommended value is 8 inch / 20 cm"
          debounce="500"
        >
          <template #append>
            <q-btn-toggle
              v-model="target.unit"
              no-caps
              :options="[
                {label: 'IN', value: 'IN'},
                {label: 'CM', value: 'CM'}
              ]"
            />
          </template>
        </q-input>
      </q-form>
    </q-card-section>
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import { useMpbrStore } from 'stores/mpbr'
import { storeToRefs } from 'pinia'
import * as BC from 'js-ballistics'
import { watch } from 'vue'

// set calculation profile
const mpbrStore = useMpbrStore()
const { target } = storeToRefs(mpbrStore)

/*
 * Unit conversion
 */
// conversion target size
watch(() => target.value.unit, (newValue) => {
  if (newValue === 'IN') {
    target.value.size = BC.UNew.Centimeter(parseFloat(target.value.size)).In(BC.Unit.Inch)
    target.value.size = Math.round(target.value.size * 10) / 10
  }
  if (newValue === 'CM') {
    target.value.size = BC.UNew.Inch(parseFloat(target.value.size)).In(BC.Unit.Centimeter)
    target.value.size = Math.round(target.value.size * 10) / 10
  }
})

</script>
