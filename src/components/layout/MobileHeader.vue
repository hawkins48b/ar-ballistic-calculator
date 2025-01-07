<template>
  <div class="row items-center q-py-md">
    <div
      class="col"
      style="height:40px"
    >
      <q-btn
        v-if="routeHasParent"
        icon="arrow_back"
        size="height:100%"
        flat
        class="q-mr-sm"
        round
        @click="router.back()"
      />
    </div>
    <div class="col-auto text-h6 text-bold">
      {{ pageName }}
    </div>
    <div class="col text-right">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const pageName = route.meta.title

const routeHasParent = computed(() => {
  let hasParent = false

  let countParent = 0
  route.matched.forEach((match) => {
    if (match.path !== route.fullPath && match.path !== '/') {
      countParent++
    }
  })

  if (countParent > 0) {
    hasParent = true
  }

  return hasParent
})

</script>
