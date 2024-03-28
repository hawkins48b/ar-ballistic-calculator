<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
  >
    <p class="text-h4">
      Ballistic Calculator
    </p>
    <p>Calculate a bullet trajectory.</p>
    <q-btn
      to="/calculator/ballistic"
      color="primary"
      class="q-mt-md"
    >
      Ballistic calculator
    </q-btn>
  </q-card>
</template>

<script setup>
// imports

</script>
