<template>
  <q-page class="q-pa-md">
    <PageHeader />
    <FirearmForm
      v-model="firearm"
      @submited="router.back()"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import FirearmForm from 'src/components/profiles/firearm/FirearmForm.vue'
import { useFirearmStore } from 'src/stores/profiles/firearm'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const firearmStore = useFirearmStore()
const firearmId = Number(route.params.firearmId)
const firearm = ref({})

firearm.value = {
  ...firearmStore.getFirearm(firearmId)
}

</script>
