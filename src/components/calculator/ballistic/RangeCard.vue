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
                RIFLE ZERO
              </q-item-label>
              <q-item-label class="text-bold">
                {{ zero.distance }} {{ zero.unit }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                CONDITONS
              </q-item-label>
              <q-item-label class="text-bold">
                <q-toggle
                  v-model="conditions.activate"
                  disabled
                >
                  ACTIVATE
                </q-toggle>
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
                {{ range.distance }} {{ range.unit }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                STEP
              </q-item-label>
              <q-item-label class="text-bold">
                {{ range.step }} {{ range.unit }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <div class="row">
      <!---->
    </div>
  </q-card>
</template>

<script setup>
// imports
// import { reactive } from 'vue'

// props
const {
  range,
  zero
} = defineProps({
  range: {
    type: Object,
    required: true
  },
  zero: {
    type: Object,
    required: true
  }
})

const conditions = {
  activate: false
}
</script>
