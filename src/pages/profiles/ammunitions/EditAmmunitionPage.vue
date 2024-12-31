<template>
  <PageHeader back />
  <q-page class="q-pa-md">
    <AmmunitionForm
      :id="ammunitionId"
      @submited="router.back()"
    />
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import AmmunitionForm from 'src/components/profiles/ammunition/AmmunitionForm.vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const ammunitionId = Number(route.params.ammunitionId)

</script>
