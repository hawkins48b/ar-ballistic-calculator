<template>
  <q-btn
    color="primary"
    @click="dialog=true"
  >
    Options
    <q-dialog
      v-model="dialog"
    >
      <q-card
        :class="{'bg-grey-3':!$q.dark.isActive}"
        flat
        style=""
        class="q-pa-md"
      >
        <p class="text-h3">
          Calculator Options
        </p>
        <q-form>
          <div>
            <q-toggle
              v-model="showAthmospheric"
              disable
            >
              Athmospheric conditions
            </q-toggle>
          </div>
          <div>
            <q-toggle
              v-model="showWindage"
              disable
            >
              Windage
            </q-toggle>
          </div>
          <div>
            <q-toggle
              v-model="showSpeedGraph"
              disable
            >
              Speed graph
            </q-toggle>
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </q-btn>
</template>

<script setup>
import { ref } from 'vue'

// dialog open/close
const dialog = ref(false)

// show conditions
const showAthmospheric = ref(false)

// show windage
const showWindage = ref(false)

// show speed graph
const showSpeedGraph = ref(false)

</script>
