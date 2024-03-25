<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
  >
    <p class="text-h4">
      Ballistic Calculator
    </p>
    <p>Calculate one or multiple bullet trajectories.</p>
    <q-btn
      color="primary"
      to="calculator/ballistic"
    >
      Ballistic calculator
    </q-btn>
  </q-card>
</template>

<script setup>
</script>
