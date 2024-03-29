<template>
  <q-page
    padding
  >
    <div class="row">
      <q-card
        flat
        class="text-center col-xs-12 col-sm-6 col-md4 q-pa-md"
        :class="{'bg-grey-3':!$q.dark.isActive}"
      >
        <div class="text-h3">
          ZRO
        </div>
        <div class="text-h6 text-italic">
          Ballistic Calculator
        </div>
        <p>Version {{ appVersion }}</p>
        <p>
          Developped by <a
            href="https://chocolate-warfare.com"
            target="_blank"
          >Chocolate Warfare
          </a>
        </p>
        <p>
          This calculator is Open Source.<br>You can access the source code on <a
            href="https://github.com/hawkins48b/cw-zro"
            target="_blank"
          >Github</a>
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

import { version } from '../../package.json'

export default {
  // name: 'PageName',
  data: function () {
    return {
      appVersion: version
    }
  }
}
</script>
