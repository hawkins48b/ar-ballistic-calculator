<template>
  <div>
    <q-icon
      name="near_me"
      class="arrow"
      :style="{
        transform: `rotate(${parseFloat(windAngle)-45}deg)`
      }"
      color="primary"
    />
    <q-icon
      name="adjust"
      class="person q-ml-md"
      color="grey-7"
    />
  </div>
</template>

<script setup>

const {
  windAngle
} = defineProps({
  windAngle: {
    type: [String, Number],
    required: true
  }
})

</script>

<style lang="scss">
.arrow {
  font-size:40px;
  transition: ease-in 500ms;
}
.person {
  font-size:40px;
}
</style>
