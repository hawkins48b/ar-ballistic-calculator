<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
  >
    <p class="text-h4">
      MBPR Tool
    </p>
    <p>Calculate your Maximum Point Blank Range (MBPR).</p>

    <q-img
      v-if="!$q.dark.isActive"
      src="~assets/mpbr-preview-light.jpg"
      style="height:200px;"
      fit="fill"
    />
    <q-img
      v-if="$q.dark.isActive"
      src="~assets/mpbr-preview-dark.jpg"
      style="height:200px;"
      fit="fill"
    />
    <q-card-actions vertical>
      <q-btn
        to="/calculators/maximum-point-blank-range"
        color="primary"
        class="q-mt-md"
      >
        MPBR Tool
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
</script>
