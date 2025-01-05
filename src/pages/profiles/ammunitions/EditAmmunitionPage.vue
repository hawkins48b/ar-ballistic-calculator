<template>
  <q-page class="q-pa-md">
    <PageHeader back>
      <AmmunitionFinderBtn v-model="ammunition" />
    </PageHeader>
    <AmmunitionForm
      v-model="ammunition"
      @submited="router.back()"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import AmmunitionForm from 'src/components/profiles/ammunition/AmmunitionForm.vue'
import AmmunitionFinderBtn from 'src/components/profiles/ammunition/AmmunitionFinderBtn.vue'
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const ammunitionStore = useAmmunitionStore()
const ammunitionId = Number(route.params.ammunitionId)
const ammunition = ref({})

ammunition.value = {
  ...ammunitionStore.getAmmunition(ammunitionId)
}

</script>
