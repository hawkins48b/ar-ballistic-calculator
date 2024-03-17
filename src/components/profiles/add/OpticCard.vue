<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div class="text-h6">
      Optic
    </div>
    <q-input
      v-model="localProfile.optic"
      label="Optic name"
      filled
      type="text"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please name your optic']"
      class="q-mt-md"
      hint="e.g Trijicon ACOG TA31"
    />
    <q-input
      v-model="localProfile.opticHeight"
      label="Optic height"
      filled
      type="number"
      step="any"
      lazy-rules
      :rules="[ val => val && val > 0 || 'Optic height must be positive']"
      class="q-mt-md"
      hint="Distance between the center of the optic and the bore axis"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.opticHeightUnit"
          no-caps
          :options="[
            {label: 'inch', value: 'inch'},
            {label: 'cm', value: 'cm'}
          ]"
        />
      </template>
    </q-input>
  </q-card>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  emits: ['update:profile'],
  computed: {
    localProfile: {
      get () {
        return this.profile
      },
      set (value) {
        this.$emit('update:profile', value)
      }
    }
  }
}
</script>
