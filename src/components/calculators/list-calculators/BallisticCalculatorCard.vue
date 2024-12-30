<template>
  <q-card
    class="cursor-pointer"
    @click="clickFn"
  >
    <q-card-section>
      <div class="text-h6">
        Ballistic Calculator
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <p>Calculate a bullet trajectory.</p>
      <q-img
        v-if="!$q.dark.isActive"
        src="~assets/ballistic-preview-light.jpg"
        style="height:200px;"
        fit="fill"
      />
      <q-img
        v-if="$q.dark.isActive"
        src="~assets/ballistic-preview-dark.jpg"
        style="height:200px;"
        fit="fill"
      />
    </q-card-section>

    <q-card-actions vertical>
      <q-btn
        color="primary"
        class="q-mt-md"
      >
        Ballistic calculator
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
// imports
import { useRouter } from 'vue-router'

const router = useRouter()
const clickFn = () => {
  router.push('/calculators/ballistic')
}
</script>
