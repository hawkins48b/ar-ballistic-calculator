<template>
  <q-form>
    <q-input
      v-model="trajectory.name"
      label="Trajectory Name"
      type="text"
      lazy-rules
      :rules="[ val => val && val != '' || 'Trajectory name must not be null']"
    />
    <ProfileSelector
      v-model="trajectory.profileId"
      class="q-mt-md"
    />
    <q-expansion-item
      icon="cloud"
      label="Atmospheric Conditions "
      class="q-mt-md"
    >
      <AtmosphereForm
        v-model="trajectory.atmosphere"
        class="q-mt-md"
      />
    </q-expansion-item>
  </q-form>
</template>

<script setup>
import ProfileSelector from 'src/components/profiles/selector/ProfileSelector.vue'
import AtmosphereForm from '../ballistic/AtmosphereForm.vue'

const trajectory = defineModel({
  type: Object
})

</script>
