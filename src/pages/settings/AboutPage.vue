<template>
  <q-page class="q-pa-md">
    <PageHeader back-to="/settings" />
    <q-card
      class="text-center"
    >
      <q-card-section>
        <div class="text-h4 q-mt-md">
          <q-img
            src="~/assets/zro-logo.svg"
            style="height: 60px"
            fit="fill"
          />Ballistic calculator
        </div>
        <div class="text-body1">
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
        </div>
      </q-card-section>
    </q-card>
    <q-card class="q-mt-md">
      <q-card-section>
        <div class="text-h6">
          Icons
        </div>
        <div class="text-body1">
          <a
            href="https://www.flaticon.com/free-icons/ammunition"
            title="ammunition icons"
          >Ammunition icons created by ultimatearm - Flaticon</a>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
import { version } from '../../../package.json'

const appVersion = version
</script>
