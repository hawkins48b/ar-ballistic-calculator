<template>
  <q-card
    class="cursor-pointer"
    @click="clickFn"
  >
    <q-card-section>
      <div class="text-h6">
        Compare trajectories
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <p>Compare multiple trajectories.</p>
      <q-img
        v-if="!$q.dark.isActive"
        src="~assets/compare-trajectories-preview-light.jpg"
        style="height:200px;"
        fit="fill"
      />
      <q-img
        v-if="$q.dark.isActive"
        src="~assets/compare-trajectories-preview-dark.jpg"
        style="height:200px;"
        fit="fill"
      />
    </q-card-section>

    <q-card-actions vertical>
      <q-btn
        color="primary"
        class="q-mt-md"
      >
        Compare trajectories
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
// imports
import { useRouter } from 'vue-router'

const router = useRouter()
const clickFn = () => {
  router.push('/calculators/compare-trajectories')
}
</script>
