<template>
  <q-dialog
    v-model="showDialog"
    medium-width
  >
    <q-card
      style="width: 700px; max-width: 80vw;"
      flat
    >
      <q-card-section
        class="row items-center q-pb-none"
      >
        <div class="text-h6">
          MBPR
        </div>
        <q-space />
        <q-btn
          v-close-popup
          icon="close"
          flat
          round
          dense
        />
      </q-card-section>
      <q-card-section>
        @todo
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      required: false,
      default: null
    },
    targetSize: {
      type: Number,
      required: false,
      default: 0
    },
    targetSizeUnit: {
      type: String,
      required: true
    }
  },
  // name: 'ComponentName',
  setup () {
    return {}
  },
  data: function () {
    return {
      showDialog: false
    }
  },
  methods: {
    show () {
      this.showDialog = true
    }
  }
}
</script>
