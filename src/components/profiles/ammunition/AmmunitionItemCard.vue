<template>
  <q-card
    class="q-mt-md"
  >
    <q-card-section>
      <div class="row">
        <div class="col text-h5">
          {{ ammunition.name }}
        </div>
        <div class="col-auto">
          <slot />
        </div>
      </div>
      <div class="text-caption">
        {{ ammunition.notes }}
      </div>
      <div class="row q-mt-sm">
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="360"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ ammunition.diameter }} {{ ammunition.diameterUnit }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="height"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ ammunition.length }} {{ ammunition.lengthUnit }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="scale"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ ammunition.weight }} {{ ammunition.weightUnit }}
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="moving"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ ammunition.ballisticCoefficient }} {{ ammunition.ballisticCoefficientProfile }}
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>

defineProps({
  ammunition: {
    type: Object,
    required: true
  }
})

</script>
