<template>
  <div>
    <q-select
      v-model="selectedOptic"
      label="Optic"
      filled
      option-label="name"
      :options="options"
      clearable
      use-input
      @update:model-value="selectChange()"
      @filter="filter"
      @clear="selectedOptic = null"
    >
      <template #append>
        <q-btn
          round
          dense
          flat
          icon="note_add"
          to="/profiles/optics/add"
        />
      </template>
    </q-select>
    <OpticItemCard
      v-if="selectedOptic"
      :optic="selectedOptic"
      class="q-mt-md"
    >
      <q-btn
        round
        dense
        flat
        icon="edit"
        size="sm"
        :to="`/profiles/optics/edit/${selectedOptic.id}`"
      />
    </OpticItemCard>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useOpticStore } from 'src/stores/profiles/optic'
import OpticItemCard from '../optic/OpticItemCard.vue'

const opticId = defineModel({
  type: [Number, String]
})

const selectedOptic = ref(null)

const opticStore = useOpticStore()

const options = ref(opticStore.opticList.slice())

const filter = function (val, update) {
  update(() => {
    options.value = opticStore.filterOpticList(val)
  })
}

onMounted(() => {
  selectedOptic.value = opticStore.getOptic(opticId.value)
})

function selectChange () {
  if (selectedOptic.value) {
    opticId.value = selectedOptic.value.id
  } else {
    opticId.value = null
  }
}

</script>
