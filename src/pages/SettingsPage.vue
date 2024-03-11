<template>
  <q-page padding>
    <q-card
      style="max-width:340px"
      flat
      bordered
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
