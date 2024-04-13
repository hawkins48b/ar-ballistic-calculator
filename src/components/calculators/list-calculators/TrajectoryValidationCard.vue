<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="cursor-pointer"
    @click="clickFn"
  >
    <p class="text-h4">
      Trajectory Validation
    </p>
    <p>Validate your bullet velocity by observations.</p>
    <q-card-actions vertical>
      <q-btn
        color="primary"
        class="q-mt-md"
      >
        Trajectory validation
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
// imports
import { useRouter } from 'vue-router'

const router = useRouter()
const clickFn = () => {
  router.push('/calculators/trajectory-validation')
}
</script>
