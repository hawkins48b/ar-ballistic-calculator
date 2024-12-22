<template>
  <q-page
    padding
  >
    <div class="row">
      <zroCard
        class="text-center col-xs-12 col-sm-6 col-md4"
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
      </zroCard>
    </div>
    <div class="row q-mt-md">
      <zroCard
        class="col-xs-12 col-sm-6 col-md4"
      >
        <div class="text-h3">
          Privacy Policy
        </div>
        <p class="q-mt-md">
          Privacy is paramount. ZRO Ballistic Calculator is designed to work entirely offline. Here's how we handle your data:
        </p>
        <ul>
          <li>
            No Online Data Storage<br>
            The app operates offline, and no personal or usage data is stored or transmitted online.
          </li>
          <br>
          <li>
            No Statistics or Tracking<br>
            We do not collect, retrieve, or analyze any statistics or user data.
          </li>
          <br>
          <li>
            Your Data Stays Local<br>
            All data entered or calculated within the app remains on your device.
          </li>
        </ul>
        <p>
          If you have any questions or concerns, feel free to <a
            href="https://chocolate-warfare.com/contact"
            target="_blank"
          >contact us</a>.
        </p>
      </zroCard>
    </div>
  </q-page>
</template>

<script setup>
import zroCard from 'components/zroCard.vue'
import { version } from '../../package.json'

const appVersion = version
</script>
