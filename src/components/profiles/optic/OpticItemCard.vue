<template>
  <q-card
    class="q-mt-md"
  >
    <q-card-section>
      <div class="row">
        <div class="col text-h5">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                v-if="optic.type === 'red dot'"
                name="adjust"
                size="md"
              />
              <q-icon
                v-if="optic.type === 'prism'"
                name="center_focus_weak"
                size="md"
              />
              <q-icon
                v-if="optic.type === 'scope'"
                name="fiber_smart_record"
                size="md"
              />
            </div>
            <div class="col q-pl-sm">
              {{ optic.name }}
            </div>
          </div>
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
              <div v-if="Array.isArray(optic.zoom)">
                {{ optic.zoom[0] }}-{{ optic.zoom[1] }}x
              </div>
              <div v-else>
                {{ optic.zoom }}x
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-6 q-pa-sm">
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="build_circle"
                size="md"
              />
            </div>
            <div
              v-if="optic.windageClickUnit === optic.elevationClickUnit && optic.windageClickValue === optic.elevationClickValue"
              class="col q-pl-sm"
            >
              {{ optic.elevationClickValue }} {{ optic.elevationClickUnit }}
            </div>
            <div
              v-else
              class="col q-pl-sm"
            >
              <q-icon name="north" />
              {{ optic.elevationClickValue }} {{ optic.elevationClickUnit }}
              <br>

              <q-icon name="west" /> {{ optic.windageClickValue }} {{ optic.windageClickUnit }}
            </div>
          </div>
        </div>
        <div
          v-if="optic.type === 'scope'"
          class="col-xs-6 q-pa-sm"
        >
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="add_circle_outline"
                size="md"
              />
            </div>
            <div
              class="col q-pl-sm"
            >
              {{ optic.focalPlane === 'first' ? '1st focal plane' : '2nd focal plane' }} {{ optic.reticle }}
            </div>
          </div>
        </div>
        <div
          v-if="optic.type === 'red dot'"
          class="col-xs-6 q-pa-sm"
        >
          <div class="row items-center">
            <div class="col-auto">
              <q-icon
                name="hdr_weak"
                size="md"
              />
            </div>
            <div
              class="col q-pl-sm"
            >
              {{ optic.dotSize }} MOA
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>

defineProps({
  optic: {
    type: Object,
    required: true
  }
})
</script>
