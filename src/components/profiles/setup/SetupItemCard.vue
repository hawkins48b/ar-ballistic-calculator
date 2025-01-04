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
      <q-list dense>
        <q-item v-if="setup.firearm">
          <q-item-section
            avatar
          >
            <q-avatar
              icon="start"
            />
          </q-item-section>
          <q-item-section>
            {{ setup.firearm.name }}
          </q-item-section>
        </q-item>
        <q-item v-if="setup.optic">
          <q-item-section avatar>
            <q-avatar
              :icon="opticStore.opticIcon(setup.optic.type)"
            />
          </q-item-section>
          <q-item-section>
            {{ setup.optic.name }}
          </q-item-section>
        </q-item>
        <q-item v-if="setup.ammunition">
          <q-item-section avatar>
            <q-avatar
              rounded
              icon="align_vertical_bottom"
            />
          </q-item-section>
          <q-item-section>
            {{ setup.ammunition.name }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { useOpticStore } from 'src/stores/profiles/optic'
import { useSetupStore } from 'src/stores/profiles/setup'

const opticStore = useOpticStore()

const setupStore = useSetupStore()

const props = defineProps({
  setup: {
    type: Object,
    required: true
  }
})

console.log('setup', props.setup)
</script>
