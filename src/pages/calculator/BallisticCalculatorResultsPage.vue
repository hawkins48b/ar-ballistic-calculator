<template>
  <q-page>
    <!-- content -->
    <div class="row justify-start q-mb-md q-ml-sm">
      <q-btn
        outline
        to="/calculator"
      >
        Back
      </q-btn>
      <div class="text-h6 q-ml-md">
        Results
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <ProfileCard
          :profile="calcArgs.profile"
        />
      </div>
      <div class="col-xs-12 col-md-6 q-pa-sm">
        <BallisticCalculatorArgsCard />
      </div>
    </div>
    <ExportButton color="primary q-mt-sm q-ml-sm" />
    <ElevationTable
      class="q-ml-sm q-mt-md"
    />
  </q-page>
</template>

<script>
import ProfileCard from 'components/profiles/view/ProfileCard.vue'
import BallisticCalculatorArgsCard from 'components/calculator/results/BallisticCalculatorArgsCard.vue'
import ExportButton from 'components/calculator/results/ExportButton.vue'
import ElevationTable from 'components/calculator/results/ElevationTable.vue'
import { LocalStorage } from 'quasar'

export default {
  components: {
    ProfileCard,
    BallisticCalculatorArgsCard,
    ExportButton,
    ElevationTable
  },
  data: function () {
    return {
      calcArgs: JSON.parse(LocalStorage.getItem('bc-args'))
    }
  }
}
</script>
