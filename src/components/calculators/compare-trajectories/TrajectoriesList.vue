<template>
  <q-markup-table flat>
    <thead>
      <tr>
        <th
          colspan="3"
          class="text-left"
        >
          <div class="text-h6">
            <q-icon
              name="stacked_line_chart"
              size="lg"
              class="q-mr-sm"
            />
            Trajectories
          </div>
        </th>
      </tr>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left gt-sm">
          Profile
        </th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(trajectory, index) in trajectories"
        :key="index"
      >
        <td>{{ trajectory.name }}</td>
        <td class="gt-sm">
          {{ profileStore.profileLabel(trajectory.profileId) }}
        </td>
        <td class="text-right">
          <q-btn
            icon="content_copy"
            flat
            round
            @click="trajectoriesStore.duplicate(index)"
          />
          <EditTrajectoryBtn v-model="trajectories[index]" />
          <q-btn
            icon="delete"
            round
            flat
            @click="trajectoriesStore.remove(index)"
          />
        </td>
      </tr>
      <tr v-show="trajectories.length === 0">
        <td
          class="text-italic"
          colspan="3"
        >
          No trajectory
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { useTrajectoriesStore } from 'stores/trajectories'
import { useProfilesStore } from 'src/stores/profiles'
import { storeToRefs } from 'pinia'
import EditTrajectoryBtn from './EditTrajectoryBtn.vue'

const trajectoriesStore = useTrajectoriesStore()
const { trajectories } = storeToRefs(trajectoriesStore)

const profileStore = useProfilesStore()

</script>
