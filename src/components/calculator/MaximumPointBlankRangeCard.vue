<template>
  <q-card>
    <p class="text-h4">
      Maximum point blank range
    </p>
    <p>Find your ideal zeroing distance based on MBPR</p>
    <q-form
      @submit="calculateMBPR"
    >
      <q-input
        v-model="targetSize"
        label="Target size"
        filled
        type="number"
        step="any"
        hint="18 inch / 45 cm is recommended"
        lazy-rules
        :rules="[ val => val && val > 0 || 'Target size must be positive']"
        class="q-mt-md"
      >
        <template #append>
          <q-btn-toggle
            v-model="targetSizeUnit"
            no-caps
            :options="[
              {label: 'inch', value: 'inch'},
              {label: 'cm', value: 'cm'}
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
        Calculate MBPR
      </q-btn>
    </q-form>
    <maximum-point-blank-range-result-dialog
      :profile="profile"
      :target-size="targetSize"
      :target-size-unit="targetSizeUnit"
    />

    <maximum-point-blank-range-result-dialog
      ref="resultDialog"
      :profile="profile"
      :target-size="targetSize"
      :target-size-unit="targetSizeUnit"
    />
  </q-card>
</template>

<script>
import MaximumPointBlankRangeResultDialog from './MaximumPointBlankRangeResultDialog.vue'
export default {
  components: { MaximumPointBlankRangeResultDialog },
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
      targetSize: 18,
      targetSizeUnit: 'inch',
      showResults: false
    }
  },
  mounted () {
  },
  methods: {
    calculateMBPR () {
      // ensure a profile is selected
      if (this.profile === null) {
        this.$q.dialog({
          title: 'Warning',
          message: 'You must select a profile before calculation'
        })
      } else {
        this.$refs.resultDialog.show()
      }
    }
  }
}
</script>
