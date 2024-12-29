<template>
  <div>
    <router-link :to="to">
      <ZroCard
        class="cursor-pointer"
      >
        <q-card-section>
          <div class="row items-center">
            <div
              v-if="icon"
              class="col-auto q-pr-md"
            >
              <q-icon
                :name="icon"
                size="md"
              />
            </div>
            <div class="col text-h6">
              {{ title }}
            </div>
            <div class="col-auto">
              <q-icon
                name="chevron_right"
                size="md"
              />
            </div>
          </div>
        </q-card-section>
      </ZroCard>
    </router-link>
  </div>
</template>

<script setup>
import ZroCard from 'src/components/zroCard.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false,
    default: ''
  },
  to: {
    type: String,
    required: true
  }
})
</script>
