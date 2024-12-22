<template>
  <zroCard
    class="cursor-pointer"
    @click="clickFn"
  >
    <p class="text-h4">
      Compare trajectories
    </p>
    <p>Compare multiple trajectories.</p>
    <q-img
      v-if="!$q.dark.isActive"
      src="~assets/trajectory-validation-preview-light.jpg"
      style="height:200px;"
      fit="fill"
    />
    <q-img
      v-if="$q.dark.isActive"
      src="~assets/trajectory-validation-preview-dark.jpg"
      style="height:200px;"
      fit="fill"
    />
    <q-card-actions vertical>
      <q-btn
        color="primary"
        class="q-mt-md"
      >
        Trajectory validation
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
  router.push('/calculators/compare-trajectories')
}
</script>
