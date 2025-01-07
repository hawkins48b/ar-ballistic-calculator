<template>
  <q-card>
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
      <q-card
        v-if="setup.firearm"
      >
        <q-card-section>
          <div
            class="row items-center q-gutter-md"
          >
            <div class="col-auto">
              <q-icon
                name="svguse:icons.svg#sniper-rifle"
                size="md"
              />
            </div>
            <div calss="col">
              {{ setup.firearm.name }}
            </div>
          </div>
        </q-card-section>
      </q-card>
      <q-card
        v-if="setup.optic"
        class="q-mt-sm"
      >
        <q-card-section>
          <div
            class="row items-center q-gutter-md"
          >
            <div class="col-auto">
              <q-icon
                :name="opticStore.opticIcon(setup.optic.type)"
                size="md"
              />
            </div>
            <div calss="col">
              {{ setup.optic.name }}
            </div>
          </div>
          <div
            class="row q-gutter-x-md q-mt-sm"
          >
            <div
              class="col"
            >
              <div class="row  items-center q-gutter-x-md">
                <div class="col-auto">
                  <q-icon
                    name="svguse:icons.svg#height"
                    size="md"
                  />
                </div>
                <div class="col">
                  {{ setup.measureOpticHeight }} {{ setup.measureOpticHeightUnit }}
                </div>
              </div>
            </div>
            <div class="col">
              <div class="row items-center q-gutter-x-md">
                <div class="col-auto">
                  <q-icon
                    name="svguse:icons.svg#human-target"
                    size="md"
                  />
                </div>
                <div class="col">
                  {{ setup.measureZeroDistance }} {{ setup.measureZeroDistanceUnit }}
                </div>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card
        v-if="setup.ammunition"
        class="q-mt-sm"
      >
        <q-card-section>
          <div
            class="row items-center q-gutter-md"
          >
            <div class="col-auto">
              <q-icon
                name="svguse:icons.svg#ammunition"
                size="sm"
              />
            </div>
            <div calss="col">
              {{ setup.ammunition.name }}
            </div>
          </div>
          <div class="row items-center q-gutter-x-md q-mt-sm">
            <div
              class="col-auto"
            >
              <q-icon
                name="svguse:icons.svg#bullet-speed"
                size="md"
              />
            </div>
            <div class="col">
              {{ setup.measureVelocity }} {{ setup.measureVelocityUnit }} at {{ setup.measureVelocityTemperature }} {{ setup.measureVelocityTemperatureUnit }}
            </div>
          </div>
        </q-card-section>
      </q-card>
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
