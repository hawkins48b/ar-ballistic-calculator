<template>
  <q-page
    padding
  >
    <q-card
      flat
      bordered
    >
      <q-card-section>
        <div class="text-h6">
          Welcome
        </div>
      </q-card-section>
      <q-card-section>
        <p>The ultimate tool for citizen. Designed with simplicity and efficiency in mind, our ballistic calculator offers a comprehensive solution to obtain accurate ballistic data for your rifles, all presented in either imperial or metric units, according to your preference.</p>
        <p>Welcome to precision, simplified.</p>
      </q-card-section>
      <q-card-actions>
        <q-btn

          color="primary"
          @click="$router.push('profiles')"
        >
          Add Profiles
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
