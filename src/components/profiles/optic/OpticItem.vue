<template>
  <div>
    <q-card
      class="q-mt-md"
    >
      <q-card-section>
        <div class="row">
          <div class="col text-h5">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  v-if="optic.type === 'red dot'"
                  name="adjust"
                  size="md"
                />
              </div>
              <div class="col q-pl-sm">
                {{ optic.name }}
              </div>
            </div>
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
        <div class="row items-center q-mt-sm">
          <div class="col-xs-6 q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="zoom_out_map"
                  size="md"
                />
              </div>
              <div
                class="col q-pl-sm"
              >
                {{ optic.zoom }}x
              </div>
            </div>
          </div>
          <div class="col-xs-6 q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="hdr_weak"
                  size="md"
                />
              </div>
              <div
                class="col q-pl-sm"
              >
                {{ optic.dotSize }} MOA
              </div>
            </div>
          </div>
          <div class="col-xs-6 q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="build_circle"
                  size="md"
                />
              </div>
              <div
                class="col q-pl-sm"
              >
                {{ optic.clickValue }} {{ optic.clickUnit }}
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
              :to="`/profilesv2/optics/edit/${optic.id}`"
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
import { useOpticStore } from 'src/stores/profiles/optic'

const props = defineProps({
  optic: {
    type: Object,
    required: true
  }
})

const dialog = ref(false)

const opticStore = useOpticStore()

const duplicate = function () {
  opticStore.duplicateOptic(props.optic.id)
  dialog.value = false
}

const remove = function () {
  opticStore.removeOptic(props.optic.id)
}
</script>
