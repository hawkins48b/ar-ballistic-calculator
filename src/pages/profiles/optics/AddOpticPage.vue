<template>
  <PageHeader back />
  <q-page class="q-pa-md">
    <OpticForm
      v-model="optic"
      @submited="router.back()"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import OpticForm from 'src/components/profiles/optic/OpticForm.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useOpticStore } from 'src/stores/profiles/optic'

const opticStore = useOpticStore()

const router = useRouter()

const optic = ref({})

optic.value = {
  ...opticStore.getOpticModel()
}
</script>
