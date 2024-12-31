<template>
  <PageHeader back-to="/profilesv2/ammunition" />
  <q-page class="q-pa-md">
    <AmmunitionForm @submited="redirect" />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import AmmunitionForm from 'src/components/profiles/ammunition/AmmunitionForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const redirect = function () {
  router.push('/profilesv2/ammunition')
}
</script>
