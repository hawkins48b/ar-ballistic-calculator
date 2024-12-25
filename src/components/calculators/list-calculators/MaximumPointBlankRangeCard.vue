<template>
  <zroCard
    class="cursor-pointer"
    @click="clickFn"
  >
    <q-card-section>
      <div class="text-h6">
        MPBR Tool
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <p>Calculate your Maximum Point Blank Range.</p>

      <q-img
        v-if="!$q.dark.isActive"
        src="~assets/mpbr-preview-light.jpg"
        style="height:200px;"
        fit="fill"
      />
      <q-img
        v-if="$q.dark.isActive"
        src="~assets/mpbr-preview-dark.jpg"
        style="height:200px;"
        fit="fill"
      />
    </q-card-section>

    <q-card-actions vertical>
      <q-btn
        color="primary"
        class="q-mt-md"
      >
        MPBR Tool
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
  router.push('/calculators/maximum-point-blank-range')
}
</script>
