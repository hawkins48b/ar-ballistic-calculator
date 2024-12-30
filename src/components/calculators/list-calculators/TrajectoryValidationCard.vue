<template>
  <q-card
    class="cursor-pointer"
    @click="clickFn"
  >
    <q-card-section>
      <div class="text-h6">
        Trajectory Validation
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <p>Validate your bullet velocity by observations.</p>
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
    </q-card-section>

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
