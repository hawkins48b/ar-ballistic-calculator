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
          :to="`/profiles/edit/${profile.id}`"
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
          <q-item-section @click="duplicateProfile">
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
            @click="removeProfile"
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
import { defineProps } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

const $q = useQuasar()
// props
const {
  profile,
  actions
} = defineProps({
  profile: {
    type: Object,
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
const removeProfile = () => {
  $q.dialog({
    title: 'Confirm',
    message: 'Are you sure you want to remove this profile ?',
    cancel: true
  }).onOk(() => {
    profilesStore.removeProfile(profile.id)
    router.push('/profiles')
  })
}

// duplicate profile feature
const duplicateProfile = () => {
  profilesStore.duplicateProfile(profile.id)
  router.push('/profiles')
}
</script>
