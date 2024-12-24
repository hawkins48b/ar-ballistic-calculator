<template>
  <q-btn
    icon="edit"
    flat
    round
    @click="dialog=true"
  >
    <q-dialog v-model="dialog">
      <ZroCard>
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                Edit trajectory
              </div>
            </div>
            <div class="col-auto">
              <q-btn
                icon="close"
                flat
                round
                @click="dialog=false"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <TrajectoryForm v-model="trajectory" />
        </q-card-section>
        <q-card-actions vertical>
          <q-btn
            icon="edit"
            color="primary"
            @click="edit"
          >
            Edit
          </q-btn>
        </q-card-actions>
      </ZroCard>
    </q-dialog>
  </q-btn>
</template>

<script setup>
import ZroCard from 'components/zroCard.vue'
import { ref, defineModel } from 'vue'
import TrajectoryForm from './TrajectoryForm.vue'

const trajectory = defineModel({
  type: Object,
  required: true
})

const dialog = ref(false)

const edit = function () {
  dialog.value = false
}
</script>
