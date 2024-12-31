<template>
  <PageHeader back-to="/profilesv2/ammunition">
    <AmmunitionFinderBtn v-model="ammunition" />
  </PageHeader>
  <q-page class="q-pa-md">
    <AmmunitionForm
      v-model="ammunition"
      @submited="redirect"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import AmmunitionForm from 'src/components/profiles/ammunition/AmmunitionForm.vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import AmmunitionFinderBtn from 'src/components/profiles/ammunition/AmmunitionFinderBtn.vue'

const ammunitionStore = useAmmunitionStore()

const router = useRouter()

const ammunition = ref({})

ammunition.value = {
  ...ammunitionStore.getAmmunitionModel()
}

const redirect = function () {
  router.push('/profilesv2/ammunition')
}
</script>
