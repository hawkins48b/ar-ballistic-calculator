<template>
  <q-card
    class="q-mt-md"
  >
    <q-badge

      v-if="setupStore.setupStatus(setup) === 'draft'"
      color="orange"
      floating
    >
      {{ setupStore.setupStatus(setup) }}
    </q-badge>
    <q-card-section>
      <div class="row">
        <div class="col">
          <div class="text-h6">
            {{ setup.name }}
          </div>
        </div>
        <div class="col-auto">
          <slot />
        </div>
      </div>
      <div
        class="row q-gutter-md"
        style="height:50px"
      >
        <div class="col-auto">
          <q-icon
            name="start"
            size="sm"
          />
        </div>
        <div calss="col">
          {{ setup.firearm.name }}
        </div>
      </div>
      <div
        class="row q-gutter-md"
        style="height:50px"
      >
        <div class="col-auto">
          <q-icon
            :name="opticStore.opticIcon(setup.optic.type)"
            size="sm"
          />
        </div>
        <div calss="col">
          {{ setup.optic.name }}
        </div>
      </div>
      <div
        class="row q-gutter-x-md"
        style="height:40px"
      >
        <div
          class="col"
          style="padding-left:40px"
        >
          <div class="row q-gutter-x-md">
            <div class="col-auto">
              <q-icon name="density_large" />
            </div>
            <div class="col">
              {{ setup.measureOpticHeight }} {{ setup.measureOpticHeightUnit }}
            </div>
          </div>
        </div>
        <div class="col">
          <div class="row q-gutter-x-md">
            <div class="col-auto">
              <q-icon
                style="rotate:45deg"
                name="open_in_full"
              />
            </div>
            <div class="col">
              {{ setup.measureZeroDistance }} {{ setup.measureZeroDistanceUnit }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="row q-gutter-md"
        style="height:50px"
      >
        <div class="col-auto">
          <q-icon
            name="align_vertical_bottom"
            size="sm"
          />
        </div>
        <div calss="col">
          {{ setup.ammunition.name }}
        </div>
      </div>
      <div class="row q-gutter-x-md">
        <div
          class="col-auto"
          style="padding-left:40px"
        >
          <q-icon name="speed" />
        </div>
        <div class="col">
          {{ setup.measureVelocity }} {{ setup.measureVelocityUnit }} at {{ setup.measureVelocityTemperature }} {{ setup.measureVelocityTemperatureUnit }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useOpticStore } from 'src/stores/profiles/optic'
import { useSetupStore } from 'src/stores/profiles/setup'

const opticStore = useOpticStore()

const setupStore = useSetupStore()

defineProps({
  setup: {
    type: Object,
    required: true
  }
})
</script>
