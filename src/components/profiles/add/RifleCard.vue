<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div class="text-h6">
      Rifle
    </div>
    <q-input
      v-model="localProfile.rifle"
      label="Weapon designation"
      filled
      type="text"
      class="q-mt-md"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please name your weapon']"
      hint="e.g LMT AR 14.5''"
    />
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
