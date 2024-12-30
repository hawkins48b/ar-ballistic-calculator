<template>
  <zroCard
    class="text-center"
  >
    <q-card-section>
      <div class="text-h6 q-mt-md">
        <q-img
          src="~/assets/zro-logo.svg"
          style="height: 40px"
          fit="fill"
        />Ballistic calculator
      </div>
      <p>Version {{ appVersion }}</p>
      <p>
        This app is <a
          href="https://fr.wikipedia.org/wiki/Open_source"
          target="_blank"
        >OpenSource</a> and based on <a
          href="https://github.com/o-murphy/js-ballistics"
          target="_blank"
        >3DOF JS-Ballistics</a> by o-murphy.
      </p>
      <p>
        You can access this app source code on <a
          href="https://github.com/hawkins48b/cw-zro"
          target="_blank"
        >Github</a>
      </p>
      <br>
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
      <p>
        Developped by <a
          href="https://chocolate-warfare.com"
          target="_blank"
        >Chocolate Warfare
        </a>
      </p>
    </q-card-section>
  </zroCard>
</template>

<script setup>
import zroCard from 'components/zroCard.vue'
import { version } from '../../../package.json'

const appVersion = version
</script>
