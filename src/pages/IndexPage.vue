<template>
  <q-page
    padding
  >
    <div class="row">
      <q-card
        flat
        bordered
        class="col-xs-12 col-sm-4"
      >
        <q-card-section>
          <div class="text-h6">
            Welcome
          </div>
        </q-card-section>
        <q-card-section>
          <p>The ultimate tool for citizen. Designed with simplicity and efficiency in mind, our ballistic calculator offers a comprehensive solution to obtain accurate ballistic data for your rifles, all presented in either imperial or metric units, according to your preference.</p>
          <p>You are welcome.</p>
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
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>
