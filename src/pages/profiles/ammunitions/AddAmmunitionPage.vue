<template>
  <PageHeader back-to="/profilev2/ammunition" />
  <q-page class="q-pa-md">
    <AmmunitionForm v-model="newAmmunition" />
    <q-btn
      icon="add"
      color="primary"
      @click="add"
    >
      Add
    </q-btn>
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'
import { ref } from 'vue'
import AmmunitionForm from 'src/components/profiles/ammunition/AmmunitionForm.vue'
import { useRouter } from 'vue-router'

const ammunitionStore = useAmmunitionStore()
const newAmmunition = ref(ammunitionStore.getAmmunitionModel())

const router = useRouter()
const add = function () {
  ammunitionStore.addAmmunition(newAmmunition)
  router.push('/profiles/ammunitions')
}

</script>
