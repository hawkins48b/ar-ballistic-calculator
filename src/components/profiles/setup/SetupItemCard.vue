<template>
  <q-card
    class="q-mt-md"
  >
    <q-card-section>
      <div class="row">
        <div class="col text-h5">
          {{ profile }}
        </div>
        <div class="col-auto">
          <slot />
        </div>
      </div>
      <div class="row items-center q-mt-sm">
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="zoom_out_map"
                size="md"
              />
            </div>
            <div
              class="col q-pl-sm"
            >
              {{ profile.firearm.name }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="zoom_out_map"
                size="md"
              />
            </div>
            <div
              class="col q-pl-sm"
            >
              {{ profile.optic.name }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="zoom_out_map"
                size="md"
              />
            </div>
            <div
              class="col q-pl-sm"
            >
              {{ profile.ammunition.name }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>

defineProps({
  profile: {
    type: Object,
    required: true
  }
})
</script>
