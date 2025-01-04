<template>
  <q-btn
    flat
    icon="more_vert"
    @click="dialog=true"
  >
    Options
    <q-dialog
      v-model="dialog"
    >
      <q-card>
        <q-card-section>
          <p class="text-h3">
            Profile Options
          </p>
        </q-card-section>
        <q-card-section>
          <q-form>
            <div>
              <q-toggle
                v-model="profile.options.enableSpinDrift"
              >
                Enable spin drift
              </q-toggle>
            </div>
            <div>
              <q-toggle
                v-model="profile.options.enablePowderSensitivity"
              >
                Enable powder sensitivity
              </q-toggle>
            </div>
          </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            v-close-popup
            label="OK"
            color="primary"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script setup>
import { ref } from 'vue'

// eslint-disable-next-line vue/require-prop-types
const profile = defineModel()

// dialog open/close
const dialog = ref(false)
</script>
