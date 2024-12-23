<template>
  <div>
    <q-btn
      color="primary"
      icon="add"
      @click="dialog=true"
    >
      Add trajectory
    </q-btn>
    <q-dialog v-model="dialog">
      <zroCard style="min-width: 300px;">
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-h6">
                Add trajectory
              </div>
            </div>
            <div class="col-auto">
              <q-btn
                icon="close"
                round
                flat
                @click="dialog=false"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <TrajectoryForm v-model="trajectory" />
        </q-card-section>
        <q-card-actions vertical>
          <q-btn
            icon="add"
            color="primary"
            @click="add"
          >
            Add
          </q-btn>
        </q-card-actions>
      </zroCard>
    </q-dialog>
  </div>
</template>

<script setup>
import zroCard from 'components/zroCard.vue'
import { ref } from 'vue'
import { useTrajectoriesStore } from 'stores/trajectories'
import TrajectoryForm from './TrajectoryForm.vue'
import { useBallisticStore } from 'stores/ballistic'

const dialog = ref(false)
const trajectoriesStore = useTrajectoriesStore()
const ballisticStore = useBallisticStore()

const modelTrajectory = {
  name: '',
  profileId: null,
  atmosphere: ballisticStore.getISA
}

const trajectory = ref({ ...modelTrajectory })

const add = function () {
  console.log('add trajectory')
  if (trajectoriesStore.add(trajectory.value)) {
    dialog.value = false
    modelTrajectory.value = { ...modelTrajectory }
  }
}

</script>
