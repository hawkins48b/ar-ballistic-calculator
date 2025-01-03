<template>
  <div class="row q-gutter-md">
    <div
      v-for="option in options"
      :key="option.value"
      class="col"
    >
      <RadioCardItem
        :icon="option.icon"
        :label="option.label"
        :label-class="labelClass"
        :hint="option.hint"
        :icon-size="iconSize"
        :value="option.value"
        :class="{active: option.value === value}"
        @click="changeRadioValue(option.value)"
      />
    </div>
  </div>
</template>

<script setup>
import RadioCardItem from './RadioCardItem.vue'

const value = defineModel({
  type: [String, Number, Boolean, Object, Array],
  required: true
})

defineProps({
  options: {
    type: Array,
    required: true
  },
  iconSize: {
    type: String,
    default: 'lg',
    required: false
  },
  labelClass: {
    type: String,
    default: 'text-h7',
    required: false
  }
})

const emit = defineEmits(['change'])

const changeRadioValue = function (newValue) {
  value.value = newValue
  emit('change')
}

</script>
