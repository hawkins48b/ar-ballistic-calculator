<template>
  <q-page
    padding
  >
    <div class="text-h3 q-mb-md">
      Welcome
    </div>
    <div class="row">
      <q-card
        flat
        class="col-xs-12 col-sm-4"
        :class="{'bg-grey-3':!$q.dark.isActive}"
      >
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
