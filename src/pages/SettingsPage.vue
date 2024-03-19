<template>
  <q-page padding>
    <p class="text-h3">
      Settings
    </p>
    <div class="row">
      <q-card
        flat
        class="col-xs-12 col-sm-4"
        :class="{'bg-grey-3':!$q.dark.isActive}"
      >
        <q-card-section class="text-h6">
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
