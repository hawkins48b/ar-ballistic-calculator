<template>
  <div>
    <q-select
      v-model="selectedAmmunition"
      label="Ammunition"
      filled
      option-label="name"
      :option-value="ammunition => (ammunition === null ? null : ammunition.id)"
      :options="options"
      clearable
      use-input
      @update:model-value="selectChange()"
      @filter="filter"
    >
      <template #append>
        <q-btn
          round
          dense
          flat
          icon="note_add"
          to="/profiles/ammunitions/add"
        />
      </template>
    </q-select>
    <AmmunitionItemCard
      v-if="selectedAmmunition"
      :ammunition="selectedAmmunition"
      class="q-mt-md"
    >
      <q-btn
        round
        dense
        flat
        icon="edit"
        size="sm"
        :to="`/profiles/ammunitions/edit/${selectedAmmunition.id}`"
      />
    </AmmunitionItemCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'
import AmmunitionItemCard from '../ammunition/AmmunitionItemCard.vue'

const ammunitionId = defineModel({
  type: [Number, String]
})

const selectedAmmunition = ref(null)

const ammunitionStore = useAmmunitionStore()

const options = ref(ammunitionStore.ammunitionList.slice())

const filter = function (val, update) {
  update(() => {
    options.value = ammunitionStore.filterAmmunitionList(val)
  })
}

onMounted(() => {
  selectedAmmunition.value = ammunitionStore.getAmmunition(ammunitionId.value)
})

function selectChange () {
  if (selectedAmmunition.value) {
    ammunitionId.value = selectedAmmunition.value.id
  } else {
    ammunitionId.value = null
  }
}

</script>
