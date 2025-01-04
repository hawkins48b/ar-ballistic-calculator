<template>
  <div>
    <q-btn
      round
      icon="more_vert"
      flat
      @click="dialog=true"
    />
    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section>
          <q-list>
            <q-item
              v-ripple
              clickable
              @click="emit('edit')"
            >
              <q-item-section avatar>
                <q-icon name="edit" />
              </q-item-section>
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-item
              v-ripple
              clickable
              @click="emit('duplicate')"
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
              @click="emit('remove')"
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

const emit = defineEmits(['edit', 'duplicate', 'remove'])

const dialog = ref(false)

const dialogClose = function () {
  dialog.value = false
}

defineExpose({
  dialogClose
})

</script>
