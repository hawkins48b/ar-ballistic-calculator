<template>
  <q-page class="q-pa-md">
    <PageHeader back />
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
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const firearmStore = useFirearmStore()

const router = useRouter()

const firearm = ref({})

firearm.value = {
  ...firearmStore.getFirearmModel()
}
</script>
