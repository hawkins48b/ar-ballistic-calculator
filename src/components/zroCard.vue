<template>
  <q-card
    :class="{'bg-grey-3':!$q.dark.isActive}"
    flat
    rounded
  >
    <slot />
  </q-card>
</template>
