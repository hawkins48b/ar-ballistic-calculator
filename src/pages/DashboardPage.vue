<template>
  <q-page
    padding
  >
    <div class="row">
      <div class="col">
        <zroCard>
          <q-card-section>
            <p>The ultimate tool for citizen. Designed with simplicity and efficiency in mind, our ballistic calculator offers a comprehensive solution to obtain accurate ballistic data for your rifles, all presented in either imperial or metric units, according to your preference.</p>
            <p>This app uses 3 degrees of freedom (3 DOF) calculation.</p>
            <p>All data are calculated and saved locally.</p>
            <p>You are welcome.</p>
          </q-card-section>
        </zroCard>
      </div>
    </div>
    <div class="row q-mt-sm q-col-gutter-md items-stretch">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <zroCard
          class="col-xs-12 col-sm-6 col-md-4"
        >
          <q-card-section class="text-center">
            <p>You have</p>
            <p class="text-h3">
              {{ nbProfiles }} profiles
            </p>
            <p>registered</p>
          </q-card-section>
          <q-card-actions vertical>
            <q-btn
              color="primary"
              to="/profiles"
            >
              Manage Profiles
            </q-btn>
          </q-card-actions>
        </zroCard>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import zroCard from 'components/zroCard.vue'
import { storeToRefs } from 'pinia'
import { useStatisticsStore } from 'stores/statistics'

const statisticsStore = useStatisticsStore()
const {
  nbProfiles
} = storeToRefs(statisticsStore)
</script>
