<template>
  <q-page class="q-pa-md">
    <PageHeader />
    <SetupForm
      v-model="newSetup"
      @submited="router.back()"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import SetupForm from 'src/components/profiles/setup/SetupForm.vue'
import { useSetupStore } from 'src/stores/profiles/setup'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

const setupStore = useSetupStore()

const router = useRouter()

const { newSetup } = storeToRefs(setupStore)

</script>
