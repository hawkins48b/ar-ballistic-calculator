<template>
  <div class="row">
    <div class="col">
      <OpticTypeCard
        icon="adjust"
        name="Red dot"
        :class="{active: type === 'red dot'}"
        @click="type = 'red dot'"
      />
    </div>
    <div class="col">
      <OpticTypeCard
        icon="center_focus_weak"
        name="Prism"
        :class="{active: type === 'prism'}"
        @click="type = 'prism'"
      />
    </div>
    <div class="col">
      <OpticTypeCard
        icon="fiber_smart_record"
        name="Scope"
        :class="{active: type === 'scope'}"
        @click="type = 'scope'"
      />
    </div>
  </div>
</template>

<script setup>
import OpticTypeCard from './OpticTypeCard.vue'

const type = defineModel({
  type: String
})

</script>
