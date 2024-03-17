<template>
  <q-page
    padding
  >
    <div class="row">
      <q-card
        flat
        class="text-center col-xs-12 col-sm-4 q-ma-md q-pa-md"
        :class="{'bg-grey-3':!$q.dark.isActive}"
      >
        <div class="text-h3">
          ZRO
        </div>
        <div class="text-h6 text-italic">
          Ballistic Calculator
        </div>
        <p>Version 1.0</p>
        <p>
          Developped by <a
            href="https://chocolate-warfare.com"
            target="_blank"
          >Chocolate Warfare
            <q-icon name="eva-diagonal-arrow-right-up-outline" /></a>
        </p>
        <p>
          This calculator is Open Source.<br>You can access the source code on <a
            href="https://github.com/hawkins48b/cw-zro"
            target="_blank"
          >Github <q-icon name="eva-diagonal-arrow-right-up-outline" /></a>
        </p>
        <p>
          <a
            href="https://chocolate-warfare.com"
            target="_blank"
          >
            <q-img
              v-if="!$q.dark.isActive"
              src="~assets/cw-logo-black.svg"
              style="height:50px;"
              fit="fill"
            />
            <q-img
              v-if="$q.dark.isActive"
              src="~assets/cw-logo-white.svg"
              style="height:50px;"
              fit="fill"
            />
          </a>
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
