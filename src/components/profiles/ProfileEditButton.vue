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
          v-if="actions.includes('edit')"
          clickable
          :to="`/profiles/edit/${profileId}`"
        >
          <q-item-section
            avatar
            side
          >
            <q-icon
              name="edit"
            />
          </q-item-section>
          <q-item-section>Edit</q-item-section>
        </q-item>
        <q-item
          v-if="actions.includes('duplicate')"
          clickable
        >
          <q-item-section
            avatar
            side
          >
            <q-icon
              name="content_copy"
            />
          </q-item-section>
          <q-item-section @click="duplicateProfile(profileId)">
            Duplicate
          </q-item-section>
        </q-item>
        <q-item
          v-if="actions.includes('remove')"
          clickable
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
          <q-item-section
            class="text-red"
            @click="removeProfile(profileId)"
          >
            Delete
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { useProfilesStore } from 'stores/profiles'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
// props
const {
  profileId,
  actions
} = defineProps({
  profileId: {
    type: Number,
    required: true
  },
  actions: {
    type: Array,
    required: false,
    default: () => []
  }
})

// profiles store
const profilesStore = useProfilesStore()

// router
const router = useRouter()

// remove profile feature
const removeProfile = (id) => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to remove this profile ?',
    cancel: true
  }).onOk(() => {
    console.log('request removeProfile with ID', id)
    profilesStore.removeProfile(id)
    router.push('/profiles')
  })
}

// duplicate profile feature
const duplicateProfile = (id) => {
  profilesStore.duplicateProfile(id)
  router.push('/profiles')
}
</script>
