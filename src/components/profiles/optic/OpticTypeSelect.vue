<template>
  <div class="row q-gutter-md">
    <div class="col">
      <OpticTypeCard
        icon="adjust"
        name="Red dot"
        :class="{active: type === 'red dot'}"
        @click="changeType('red dot')"
      />
    </div>
    <div class="col">
      <OpticTypeCard
        icon="center_focus_weak"
        name="Prism"
        :class="{active: type === 'prism'}"
        @click="changeType('prism')"
      />
    </div>
    <div class="col">
      <OpticTypeCard
        icon="fiber_smart_record"
        name="Scope"
        :class="{active: type === 'scope'}"
        @click="changeType('scope')"
      />
    </div>
  </div>
</template>

<script setup>
import OpticTypeCard from './OpticTypeCard.vue'

const type = defineModel({
  type: String
})

const emit = defineEmits(['change'])

const changeType = function (newType) {
  type.value = newType
  emit('change')
}

</script>
