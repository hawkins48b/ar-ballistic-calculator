<template>
  <q-page padding>
    <div class="row">
      <q-card
        flat
        bordered
        class="col-xs-12 col-sm-4"
      >
        <q-card-section>
          General
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section>
                Theme
              </q-item-section>
              <q-item-section>
                <DarkModeToggle
                  label="Dark mode"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import DarkModeToggle from 'components/settings/darkModeToggle.vue'

export default {
  components: {
    DarkModeToggle
  }
}
</script>
