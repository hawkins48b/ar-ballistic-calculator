<template>
  <PageHeader back-to="/settings" />
  <q-page class="q-pl-md q-pr-md">
    <q-card
      class="col-xs-12 col-sm-6 col-md4"
    >
      <q-card-section class="body-text">
        <p class="q-mt-md text-italic text-center text-h4">
          Privacy is paramount
        </p>
        <p>
          ZRO Ballistic Calculator is designed to work entirely offline. Here's how we handle your data:
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
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import PageHeader from 'src/components/layout/PageHeader.vue'
</script>
