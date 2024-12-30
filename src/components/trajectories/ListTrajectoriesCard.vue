<template>
  <div class="row">
    <div class="col-xs-12 col-sm-6 col-md-4">
      <q-card>
        <q-markup-table flat>
          <thead>
            <tr>
              <th class="text-left">
                Action
              </th>
              <th class="text-left">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="shot in shotsArray"
              :key="shot.id"
            >
              <td class="text-left">
                <q-btn
                  icon="delete"
                  flat
                  @click="removeTrajectory(shot.id)"
                />
              </td>
              <td class="text-left">
                {{ shot.name }}
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>
    </div>
  </div>
</template>

<script setup>
// imports
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useShotsStore } from 'stores/shots'

const $q = useQuasar()

const shotsStore = useShotsStore()
const { shotsArray } = storeToRefs(shotsStore)

const removeTrajectory = (id) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to delete this trajectory ?',
    cancel: true
  }).onOk(() => {
    shotsStore.removeShot(id)
  })
}
</script>
