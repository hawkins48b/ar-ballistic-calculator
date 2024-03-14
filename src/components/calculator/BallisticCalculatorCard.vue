<template>
  <q-card>
    <p class="text-h4">
      Ballistic Calculator
    </p>
    <p>Bullet path data</p>
    <q-form
      @submit="calculateBallistic"
    >
      <q-input
        v-model="zeroDistance"
        label="Zero distance"
        filled
        type="number"
        step="any"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Zero distance must be positive']"
        class="q-mt-md"
      >
        <template #append>
          <q-btn-toggle
            v-model="zeroDistanceUnit"
            no-caps
            :options="[
              {label: 'yard', value: 'yard'},
              {label: 'meter', value: 'meter'}
            ]"
          />
        </template>
      </q-input>

      <div>
        <p>Results Unit</p>
        <q-btn-toggle
          v-model="resultsUnit"
          no-caps
          :options="[
            {label: 'yard', value: 'yard'},
            {label: 'meter', value: 'meter'}
          ]"
        />
      </div>

      <q-input
        v-model="resultsRange"
        label="Range"
        filled
        type="number"
        step="any"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Range must be positive']"
        class="q-mt-md"
      />

      <q-input
        v-model="resultsStep"
        label="Step"
        filled
        type="number"
        step="any"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Step must be positive']"
        class="q-mt-md"
      />

      <q-btn
        filled
        color="primary"
        class="q-mt-md"
        type="submit"
      >
        Results
      </q-btn>
    </q-form>

    <BallisticCalculatorResultsDialog
      ref="resultsDialog"
      :profile="profile"
      :zero-distance="zeroDistance"
      :zero-distance-unit="zeroDistanceUnit"
      :results-unit="resultsUnit"
      :results-range="resultsRange"
      :results-step="resultsStep"
    />
  </q-card>
</template>

<script>

import BallisticCalculatorResultsDialog from 'components/calculator/BallisticCalculatorResultsDialog.vue'

export default {
  components: {
    BallisticCalculatorResultsDialog
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
      zeroDistance: 25,
      zeroDistanceUnit: 'yard',
      resultsUnit: 'yard',
      resultsRange: 500,
      resultsStep: 25,
      showResults: false
    }
  },
  mounted () {
  },
  methods: {
    calculateBallistic () {
      // ensure a profile is selected
      if (this.profile === null) {
        this.$q.dialog({
          title: 'Warning',
          message: 'You must select a profile before calculation.'
        })
      } else {
        this.$refs.resultsDialog.show()
      }
    }
  }
}
</script>
