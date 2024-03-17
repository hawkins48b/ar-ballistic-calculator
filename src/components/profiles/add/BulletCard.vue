<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    class="q-pa-md"
  >
    <div class="text-h6">
      Ammo
    </div>
    <q-input
      v-model="localProfile.bulletName"
      label="Bullet name"
      filled
      type="text"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please name your ammo']"
      class="q-mt-md"
      hint="Manufacturer and type"
    />

    <q-input
      v-model="localProfile.bulletDiameter"
      label="Bullet diameter"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Bullet diameter must be positive',
        val => val && val < 13 || val + ' ' + localProfile.bulletDiameterUnit +' is a big bullet, are you missing a comma ?'
      ]"
      class="q-mt-md"
      hint="e.g .233 inch or 5.56 mm"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.bulletDiameterUnit"
          no-caps
          :options="[
            {label: 'inch', value: 'inch'},
            {label: 'mm', value: 'mm'}
          ]"
        />
      </template>
    </q-input>

    <q-input
      v-model="localProfile.bulletWeight"
      label="Bullet weight"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[ val => val && val > 0 || 'Bullet weight must be positive']"
      class="q-mt-md"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.bulletWeightUnit"
          no-caps
          :options="[
            {label: 'grain', value: 'grain'},
            {label: 'gram', value: 'gram'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="localProfile.bulletVelocity"
      label="Velocity"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[ val => val && val > 0 || 'Velocity must be positive']"
      class="q-mt-md"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.bulletVelocityUnit"
          no-caps
          :options="[
            {label: 'FPS', value: 'FPS'},
            {label: 'm/s', value: 'm/s'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="localProfile.bulletBallisticCoefficient"
      label="Ballistic coefficient"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[ val => val && val > 0 || 'Ballistic coefficient must be positive']"
      class="q-mt-md"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.bulletBallisticCoefficientProfile"
          no-caps
          :options="[
            {label: 'G1', value: 'G1'},
            {label: 'G7', value: 'G7'}
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
