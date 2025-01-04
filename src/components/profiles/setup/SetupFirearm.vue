<template>
  <div>
    <q-select
      v-model="selectedFirearm"
      label="Firearm"
      filled
      option-label="name"
      :option-value="firearm => (firearm === null ? null : firearm.id)"
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
          @click="router.push('/profiles/firearms/add')"
        >
          <template #loading />
        </q-btn>
      </template>
    </q-select>
    <FirearmItemCard
      v-if="selectedFirearm"
      :firearm="selectedFirearm"
      class="q-mt-md"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFirearmStore } from 'src/stores/profiles/firearm'
import FirearmItemCard from '../firearm/FirearmItemCard.vue'
import { useRouter } from 'vue-router'

const firearmId = defineModel({
  type: [Number, String]
})

const router = useRouter()

const selectedFirearm = ref(null)

const firearmStore = useFirearmStore()

const options = ref(firearmStore.firearmList.slice())

const filter = function (val, update) {
  update(() => {
    options.value = firearmStore.filterFirearmList(val)
  })
}

onMounted(() => {
  selectedFirearm.value = firearmStore.getFirearm(firearmId.value)
})

function selectChange () {
  if (selectedFirearm.value) {
    firearmId.value = selectedFirearm.value.id
  } else {
    firearmId.value = null
  }
}

</script>
