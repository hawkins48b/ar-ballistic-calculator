<template>
  <q-card>
    <p class="text-h4">
      Ballistic Calculator
    </p>
    <p>Distances</p>
    <q-form
      @submit="calculateBallistic"
    >
      <q-input
        v-model="calcArgs.zeroDistance"
        label="Zero distance"
        filled
        type="number"
        step="any"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Zero distance must be positive']"
        class="q-mt-md"
        hint="The distance where you zeroed your optic"
      >
        <template #append>
          <q-btn-toggle
            v-model="calcArgs.zeroDistanceUnit"
            no-caps
            :options="[
              {label: 'YD', value: 'YD'},
              {label: 'M', value: 'M'}
            ]"
          />
        </template>
      </q-input>

      <q-input
        v-model="calcArgs.resultsRange"
        label="Range"
        filled
        type="number"
        step="any"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Range must be positive']"
        class="q-mt-md"
        hint="Maximum range for the calculation"
      >
        <template #append>
          <q-btn-toggle
            v-model="calcArgs.resultsUnit"
            no-caps
            :options="[
              {label: 'YD', value: 'YD'},
              {label: 'M', value: 'M'}
            ]"
          />
        </template>
      </q-input>

      <q-input
        v-model="calcArgs.resultsStep"
        label="Step"
        filled
        type="number"
        step="any"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Step must be positive']"
        class="q-mt-md"
        hint="25 is a recommended value"
      >
        <template #append>
          <q-btn-toggle
            v-model="calcArgs.resultsUnit"
            no-caps
            :options="[
              {label: 'YD', value: 'YD'},
              {label: 'M', value: 'M'}
            ]"
          />
        </template>
      </q-input>

      <q-btn
        filled
        color="primary"
        class="q-mt-md"
        type="submit"
      >
        Results
      </q-btn>
    </q-form>
  </q-card>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  components: {
  },
  // name: 'ComponentName',
  props: {
    profile: {
      type: Object,
      required: false,
      default: null
    }
  },
  data: function () {
    return {
      calcArgs: JSON.parse(LocalStorage.getItem('bc-args')) || this.newCalcArgs()
    }
  },
  methods: {
    newCalcArgs () {
      return {
        zeroDistance: 25,
        zeroDistanceUnit: 'YD',
        resultsUnit: 'YD',
        resultsRange: 500,
        resultsStep: 25,
        profile: null
      }
    },
    calculateBallistic () {
      // ensure a profile is selected
      if (this.profile === null) {
        this.$q.dialog({
          title: 'Warning',
          message: 'You must select a profile before calculation.'
        })
      } else {
        // persists calculator arguments
        this.calcArgs.profile = this.profile
        LocalStorage.set('bc-args', JSON.stringify(this.calcArgs))
        // go to results page
        this.$router.push({
          path: 'calculator/bc-results'
        })
      }
    }
  }
}
</script>
