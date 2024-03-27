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
      v-model="localProfile.bullet.brand"
      label="Bullet brand"
      filled
      type="text"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'Please name your ammo']"
      class="q-mt-md"
      hint="Manufacturer and type"
    />

    <q-input
      v-model="localProfile.bullet.diameter"
      label="Bullet diameter"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[
        val => val && val > 0 || 'Bullet diameter must be positive',
        val => val && val < 13 || val + ' ' + localProfile.bullet.diameterUnit +' is a big bullet, are you missing a comma ?'
      ]"
      class="q-mt-md"
      hint="e.g .233 inch or 5.56 mm"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.bullet.diameterUnit"
          no-caps
          :options="[
            {label: 'IN', value: 'IN'},
            {label: 'MM', value: 'MM'}
          ]"
        />
      </template>
    </q-input>

    <q-input
      v-model="localProfile.bullet.weight"
      label="Bullet weight"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[ val => val && val > 0 || 'Bullet weight must be positive']"
      class="q-mt-md"
      hint="e.g 55gr"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.bullet.weightUnit"
          no-caps
          :options="[
            {label: 'GR', value: 'GR'},
            {label: 'G', value: 'G'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="localProfile.bullet.velocity"
      label="Velocity"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[ val => val && val > 0 || 'Velocity must be positive']"
      class="q-mt-md"
      hint="e.g 2700 FPS"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.bullet.velocityUnit"
          no-caps
          :options="[
            {label: 'FPS', value: 'FPS'},
            {label: 'M/S', value: 'M/S'}
          ]"
        />
      </template>
    </q-input>
    <q-input
      v-model="localProfile.bullet.ballisticCoefficient"
      label="Ballistic coefficient"
      filled
      step="any"
      type="number"
      lazy-rules
      :rules="[ val => val && val > 0 || 'Ballistic coefficient must be positive']"
      class="q-mt-md"
      hint="e.g 0.290 G1"
    >
      <template #append>
        <q-btn-toggle
          v-model="localProfile.bullet.ballisticCoefficientProfile"
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
