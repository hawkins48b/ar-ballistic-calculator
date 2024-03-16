<template>
  <q-page
    padding
  >
    <div class="row">
      <q-card
        flat
        class="text-center col-xs-12 col-sm-4 q-ma-md"
        :class="{'bg-grey-3':!$q.dark.isActive}"
      >
        <h3>ZeroIQ</h3>
        <h4> Ballistic Calculator</h4>
        <p>Version 1.0</p>
        <p>
          Developped by <a
            href="https://chocolate-warfare.com"
            target="_blank"
          >Chocolate Warfare</a>
        </p>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
}
</script>
