<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
  >
    <slot />
  </q-card>
</template>
