<template>
  <div>
    <div class="row">
      <div class="col-auto">
        <q-btn
          flat
          to="/calculators"
          icon="arrow_back"
        />
      </div>
    </div>
    <ProfileCard class="q-mt-sm" />
    <DopeListCard class="q-mt-md" />
  </div>
</template>

<script setup>
import DopeListCard from 'src/components/calculators/dope-cards/DopeListCard.vue'
import ProfileCard from 'src/components/calculators/dope-cards/ProfileCard.vue'

</script>
