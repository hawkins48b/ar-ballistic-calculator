<template>
  <q-btn
    color="grey-7"
    round
    flat
    icon="more_vert"
  >
    <q-menu
      auto-close
      cover
    >
      <q-list>
        <q-item
          clickable
          @click="dialog=true"
        >
          <q-item-section
            avatar
            side
          >
            <q-icon name="edit" />
          </q-item-section>
          <q-item-section>
            Edit
          </q-item-section>
        </q-item>

        <q-item
          clickable
          @click="trajectoriesStore.duplicate(index)"
        >
          <q-item-section
            avatar
            side
          >
            <q-icon name="content_copy" />
          </q-item-section>
          <q-item-section>
            Duplicate
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="trajectoriesStore.remove(index)"
        >
          <q-item-section
            avatar
            side
          >
            <q-icon
              color="red"
              name="delete"
            />
          </q-item-section>
          <q-item-section class="text-red">
            Delete
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
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
          <TrajectoryForm v-model="trajectoriesStore.trajectories[index]" />
        </q-card-section>
        <q-card-actions vertical>
          <q-btn
            icon="edit"
            color="primary"
            @click="dialog=false"
          >
            Edit
          </q-btn>
        </q-card-actions>
      </ZroCard>
    </q-dialog>
  </q-btn>
</template>

<script setup>
import { useTrajectoriesStore } from 'stores/trajectories'
import { defineProps, ref } from 'vue'
import TrajectoryForm from './TrajectoryForm.vue'
import ZroCard from 'src/components/zroCard.vue'

const trajectoriesStore = useTrajectoriesStore()

const dialog = ref(false)

defineProps({
  index: {
    type: Number,
    required: true
  }
})
</script>
