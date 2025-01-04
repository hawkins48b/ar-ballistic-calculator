<template>
  <PageHeader back />
  <q-page class="q-pa-md">
    <SetupForm
      v-model="setup"
      @submited="router.back()"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import SetupForm from 'src/components/profiles/setup/SetupForm.vue'
import { useSetupStore } from 'src/stores/profiles/setup'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const setupStore = useSetupStore()
const setupId = Number(route.params.setupId)
const setup = ref({})

setup.value = {
  ...setupStore.getSetup(setupId)
}

</script>
