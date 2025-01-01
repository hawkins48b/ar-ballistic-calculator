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
import { useOpticStore } from 'src/stores/profiles/optic'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const opticStore = useOpticStore()
const opticId = Number(route.params.opticId)
const optic = ref({})

optic.value = {
  ...opticStore.getOptic(opticId)
}

</script>
