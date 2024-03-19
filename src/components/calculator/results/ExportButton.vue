<template>
  <q-btn @click="exportToExcel()">
    Export to Excel
  </q-btn>
</template>

<script>
export default {
  // name: 'ComponentName',
  setup () {
    return {}
  },
  methods: {
    exportToExcel () {
      this.$q.dialog({
        title: 'Export to Excel',
        message: 'To be developped ;)'
      })
    }
  }
}
</script>
