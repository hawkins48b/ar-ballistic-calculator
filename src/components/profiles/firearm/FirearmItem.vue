<template>
  <div>
    <q-card
      class="q-mt-md"
    >
      <q-card-section>
        <div class="row">
          <div class="col text-h5">
            {{ firearm.name }}
          </div>
          <div class="col-auto">
            <q-btn
              round
              icon="more_vert"
              flat
              @click="dialog=true"
            />
          </div>
        </div>
        <div class="text-caption">
          {{ firearm.notes }}
        </div>
        <div class="row q-mt-sm">
          <div class="col-xs-6 q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="start"
                  size="md"
                />
              </div>
              <div class="col q-pl-sm">
                {{ firearm.barrelLength }} {{ firearm.barrelLengthUnit }}
              </div>
            </div>
          </div>
          <div class="col-xs-6 q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="storm"
                  size="md"
                />
              </div>
              <div class="col q-pl-sm">
                1/{{ firearm.barrelTwist }} {{ firearm.barrelTwistUnit }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <q-list>
            <q-item
              v-ripple
              clickable
              :to="`/profilesv2/firearms/edit/${firearm.id}`"
            >
              <q-item-section avatar>
                <q-icon name="edit" />
              </q-item-section>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item
              v-ripple
              clickable
              @click="duplicate"
            >
              <q-item-section avatar>
                <q-icon name="content_copy" />
              </q-item-section>
              <q-item-section>Duplicate</q-item-section>
            </q-item>
            <q-item
              v-ripple
              clickable
              class="text-red"
              @click="remove"
            >
              <q-item-section avatar>
                <q-icon name="delete" />
              </q-item-section>
              <q-item-section>Delete</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFirearmStore } from 'src/stores/profiles/firearm'

const props = defineProps({
  firearm: {
    type: Object,
    required: true
  }
})

const dialog = ref(false)

const firearmStore = useFirearmStore()

const duplicate = function () {
  firearmStore.duplicateFirearm(props.firearm.id)
  dialog.value = false
}

const remove = function () {
  firearmStore.removeFirearm(props.firearm.id)
}
</script>
