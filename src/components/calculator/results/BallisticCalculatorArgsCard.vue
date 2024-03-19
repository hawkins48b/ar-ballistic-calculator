<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
  >
    <div class="row">
      <div class="col">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                ZERO
              </q-item-label>
              <q-item-label class="text-bold">
                {{ calcArgs.zeroDistance }} {{ calcArgs.zeroDistanceUnit }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                WIND
              </q-item-label>
              <q-item-label class="text-bold">
                @tbd
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="col">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                RANGE
              </q-item-label>
              <q-item-label class="text-bold">
                {{ calcArgs.resultsRange }} {{ calcArgs.resultsUnit }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                STEP
              </q-item-label>
              <q-item-label class="text-bold">
                {{ calcArgs.resultsStep }} {{ calcArgs.resultsUnit }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-card>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  // name: 'ComponentName',
  setup () {
    return {
      calcArgs: JSON.parse(LocalStorage.getItem('bc-args'))
    }
  }
}
</script>
