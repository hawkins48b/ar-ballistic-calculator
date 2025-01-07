<template>
  <div
    class="row items-center q-py-md"
  >
    <div class="col-auto">
      <q-breadcrumbs
        v-if="breadcrumbs.length > 0"
      >
        <q-breadcrumbs-el
          v-for="(breadcrumb, index) in breadcrumbs"
          :key="index"
          :label="breadcrumb.label"
          :to="breadcrumb.path"
        />
      </q-breadcrumbs>
    </div>
    <div
      class="col text-right"
      style="height:36px"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched.map(match => ({ label: match.meta.title, path: match.path, name: match.name }))
  return matchedRoutes.filter(match => {
    let valid = false
    if (match.label) {
      valid = true
    }
    if (!match.name && match.path === route.fullPath) {
      valid = false
    }

    return valid
  })
})

</script>
