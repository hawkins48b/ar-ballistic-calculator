<template>
  <q-dialog
    v-model="showDialog"
    medium-width
  >
    <q-card
      style="width: 700px; max-width: 80vw;"
      flat
    >
      <q-card-section
        class="row items-center q-pb-none"
      >
        <div class="text-h6">
          Calculation results
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
          stretch
        />
      </q-card-section>
      <q-card-section>
        <q-table
          flat
          bordered
          :rows="resultsRows"
          :colums="resultsColumns"
          :row-key="resultsKey"
          :rows-per-page-options="[0]"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>

import {
  calculateG1ElevationAdjustments,
  calculateG7ElevationAdjustments,
  getCrossSectionalArea
} from 'components/calculator/BalisticCalculator.js'

import {
  zeroDistanceInMeters,
  distanceStepInMeter,
  distanceMaxInMeter,
  opticHeightInMeter,
  bulletDiameterInMeter,
  bulletWeightInKg,
  velocityInMetersPerSecond
} from 'components/calculator/UnitConverter.js'

export default {
  props: {
    profile: {
      type: Object,
      required: false,
      default: null
    },
    zeroDistance: {
      type: Number,
      required: false,
      default: 0
    },
    zeroDistanceUnit: {
      type: String,
      required: true
    },
    resultsUnit: {
      type: String,
      required: true
    },
    resultsRange: {
      type: Number,
      required: true
    },
    resultsStep: {
      type: Number,
      required: true
    }
  },
  // name: 'ComponentName',
  setup () {
    return {}
  },
  data: function () {
    return {
      showDialog: false,
      resultsRows: [],
      resultsColumns: [
        {
          name: 'distance',
          required: true,
          label: 'Distance',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'adjustment',
          required: true,
          label: 'Elevation (cm)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        {
          name: 'time',
          required: true,
          label: 'Flight time',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        }
      ],
      resultsKey: 'distance'
    }
  },
  methods: {
    show () {
      this.showDialog = true

      // calculate

      if (this.profile.bulletBallisticCoefficientProfile === 'G1') {
        console.log('start G1 calc')
        console.log('opticHeightInMeter', opticHeightInMeter(this.profile.rifleOpticHeight, this.profile.rifleOpticHeightUnit))
        console.log('zeroDistanceInMeters', zeroDistanceInMeters(this.zeroDistance, this.zeroDistanceUnit))
        console.log('bulletWeightInKg', bulletWeightInKg(this.profile.bulletWeight, this.profile.bulletWeightUnit))
        console.log('getCrossSectionalArea', getCrossSectionalArea(bulletDiameterInMeter(this.profile.bulletDiameter, this.profile.bulletDiameterUnit)))
        console.log('velocityInMetersPerSecond', velocityInMetersPerSecond(this.profile.bulletVelocity, this.profile.bulletVelocityUnit))
        console.log('distanceMaxInMeter', distanceMaxInMeter(this.resultsRange, this.resultsUnit))
        console.log('distanceStepInMeter', distanceStepInMeter(this.resultsStep, this.resultsUnit))

        this.resultsRows = calculateG1ElevationAdjustments(
          this.profile.bulletBallisticCoefficient,
          opticHeightInMeter(this.profile.rifleOpticHeight, this.profile.rifleOpticHeightUnit),
          zeroDistanceInMeters(this.zeroDistance, this.zeroDistanceUnit),
          bulletWeightInKg(this.profile.bulletWeight, this.profile.bulletWeightUnit),
          getCrossSectionalArea(bulletDiameterInMeter(this.profile.bulletDiameter, this.profile.bulletDiameterUnit)),
          velocityInMetersPerSecond(this.profile.bulletVelocity, this.profile.bulletVelocityUnit),
          distanceMaxInMeter(this.resultsRange, this.resultsUnit),
          distanceStepInMeter(this.resultsStep, this.resultsUnit)
        )
      }
      if (this.profile.bulletBallisticCoefficientProfile === 'G7') {
        this.resultsRows = calculateG7ElevationAdjustments(
          this.profile.bulletBallisticCoefficient,
          opticHeightInMeter(this.profile.rifleOpticHeight, this.profile.rifleOpticHeightUnit),
          zeroDistanceInMeters(this.zeroDistance, this.zeroDistanceUnit),
          bulletWeightInKg(this.profile.bulletWeight, this.profile.bulletWeightUnit),
          getCrossSectionalArea(bulletDiameterInMeter(this.profile.bulletDiameter, this.profile.bulletDiameterUnit)),
          velocityInMetersPerSecond(this.profile.bulletVelocity, this.profile.bulletVelocityUnit),
          distanceMaxInMeter(this.resultsRange, this.resultsUnit),
          distanceStepInMeter(this.resultsStep, this.resultsUnit)
        )
      }

      console.log(this.resultsRows)

      /*
      g1BC,
      opticHeight, // in meters
      zeroingDistance, // in meters
      bulletWeight, // in kg
      crossSectionalArea, // in m^2
      initialVelocity, // in m/s
      distanceMax, // in meters
      step // in meters
  */
    }
  }
}
</script>
