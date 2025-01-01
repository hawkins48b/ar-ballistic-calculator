<template>
  <div>
    <q-card
      class="q-mt-md"
    >
      <q-card-section>
        <div class="row">
          <div class="col text-h5">
            {{ ammunition.name }}
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
        <div class="row q-mt-sm">
          <div class="col-xs-6 q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="360"
                  size="md"
                />
              </div>
              <div class="col q-pl-sm">
                {{ ammunition.diameter }} {{ ammunition.diameterUnit }}
              </div>
            </div>
          </div>
          <div class="col-xs-6 q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="height"
                  size="md"
                />
              </div>
              <div class="col q-pl-sm">
                {{ ammunition.length }} {{ ammunition.lengthUnit }}
              </div>
            </div>
          </div>
          <div class="col-xs-6 q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="scale"
                  size="md"
                />
              </div>
              <div class="col q-pl-sm">
                {{ ammunition.weight }} {{ ammunition.weightUnit }}
              </div>
            </div>
          </div>
          <div class="col-xs-6 q-pa-sm">
            <div class="row items-center">
              <div class="col-auto">
                <q-icon
                  name="moving"
                  size="md"
                />
              </div>
              <div class="col q-pl-sm">
                {{ ammunition.ballisticCoefficient }} {{ ammunition.ballisticCoefficientProfile }}
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
              :to="`/profilesv2/ammunition/edit/${ammunition.id}`"
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
import { useAmmunitionStore } from 'src/stores/profiles/ammunition'

const props = defineProps({
  ammunition: {
    type: Object,
    required: true
  }
})

const dialog = ref(false)

const ammunitionStore = useAmmunitionStore()

const duplicate = function () {
  ammunitionStore.duplicateAmmunition(props.ammunition.id)
  dialog.value = false
}

const remove = function () {
  ammunitionStore.removeAmmunition(props.ammunition.id)
}
</script>
