<template>
  <q-card
    class="q-mt-md"
  >
    <q-card-section>
      <q-list dense>
        <q-item class="text-h6">
          {{ setup.name }}
        </q-item>
        <q-item>
          <q-item-section
            avatar
            class="q-pr-sm"
          >
            <q-avatar
              :icon="opticStore.opticIcon(setup.optic.type)"
              class="q-mr-sm"
            />
          </q-item-section>
          <q-item-section>
            {{ setup.firearm.name }}
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section avatar>
            <q-avatar
              rounded
              icon="fiber_smart_record"
            />
          </q-item-section>
          <q-item-section>
            {{ setup.optic.name }}
          </q-item-section>
        </q-item>
        <q-item>
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

const opticStore = useOpticStore()

defineProps({
  setup: {
    type: Object,
    required: true
  }
})
</script>
