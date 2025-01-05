<template>
  <q-card
    class="q-mt-md"
  >
    <q-card-section>
      <div class="row">
        <div class="col text-h5">
          {{ firearm.name }}
        </div>
        <div class="col-auto">
          <slot />
        </div>
      </div>
      <div class="text-caption">
        {{ firearm.notes }}
      </div>
      <div class="row q-mt-sm">
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="svguse:icons.svg#length"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ firearm.barrelLength }} {{ firearm.barrelLengthUnit }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="storm"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              1/{{ firearm.barrelTwist }} {{ firearm.barrelTwistUnit }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>

defineProps({
  firearm: {
    type: Object,
    required: true
  }
})
</script>
