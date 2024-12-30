<template>
  <q-card
    v-touch-hold.mouse="touchHold"
    v-ripple="$q.platform.is.mobile"
    class="q-mt-md"
  >
    <q-card-section>
      <div class="row">
        <div class="col text-h5">
          GP90
        </div>
        <div class="col-auto desktop-only">
          <q-btn
            round
            icon="more_vert"
            flat
            @click="dialog=true"
          />
        </div>
      </div>
      <div class="row q-mt-sm">
        <div class="col text-body1">
          <div class="row items-center q-gutter-md">
            <div class="col-auto">
              <q-icon
                name="hide_source"
                size="md"
              />
            </div>
            <div class="col">
              5.56 MM
            </div>
          </div>
        </div>
        <div class="col text-body1">
          <div class="row items-center q-gutter-md">
            <div class="col-auto">
              <q-icon
                name="scale"
                size="md"
              />
            </div>
            <div class="col">
              64 GR
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
          >
            <q-item-section avatar>
              <q-icon name="edit" />
            </q-item-section>
            <q-item-section>Edit</q-item-section>
          </q-item>
          <q-item
            v-ripple
            clickable
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
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const dialog = ref(false)

const touchHold = () => {
  dialog.value = true
}
</script>
