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
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const setupStore = useSetupStore()

const router = useRouter()

const setup = ref({})

setup.value = {
  ...setupStore.getSetupModel()
}
</script>
