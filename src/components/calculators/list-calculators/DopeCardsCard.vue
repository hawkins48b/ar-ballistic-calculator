<template>
  <zroCard
    class="cursor-pointer"
    @click="clickFn"
  >
    <q-card-section>
      <div class="text-h6">
        Generate dope cards
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <p>Generate printable dope cards.</p>
      <q-img
        v-if="!$q.dark.isActive"
        src="~assets/dope-chart-preview-light.jpg"
        style="height:200px;"
        fit="fill"
      />
      <q-img
        v-if="$q.dark.isActive"
        src="~assets/dope-chart-preview-dark.jpg"
        style="height:200px;"
        fit="fill"
      />
    </q-card-section>

    <q-card-actions vertical>
      <q-btn
        color="primary"
        class="q-mt-md"
      >
        Dope cards generator
      </q-btn>
    </q-card-actions>
  </zroCard>
</template>

<script setup>
// imports
import zroCard from 'components/zroCard.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const clickFn = () => {
  router.push('/calculators/dope-cards')
}
</script>
