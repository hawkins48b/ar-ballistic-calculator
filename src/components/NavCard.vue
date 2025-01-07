<template>
  <div>
    <router-link :to="to">
      <q-card
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
              {{ label }}
            </div>
            <div class="col-auto">
              <q-icon
                name="chevron_right"
                size="md"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </router-link>
  </div>
</template>

<script setup>

defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false,
    default: ''
  },
  to: {
    type: [String, Object],
    required: true
  }
})
</script>
