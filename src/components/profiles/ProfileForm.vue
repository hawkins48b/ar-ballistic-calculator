<template>
  <q-form @submit="submitProfile">
    <div class="row q-mt-md">
      <div class="col-xs-12 col-md-4 q-pa-sm">
        <WeaponCard
          ref="rifle"
          :profile="profile"
        />
        <OpticCard
          :profile="profile"
          class="q-mt-md"
        />
      </div>
      <div class="col-xs-12 col-md-4 q-pa-sm">
        <BulletCard :profile="profile" />
      </div>
    </div>
    <div class="row">
      <div class="q-pl-sm q-mt-md">
        <q-btn
          color="primary"
          :icon="submitIcon"
          type="submit"
        >
          {{ submitText }}
        </q-btn>
      </div>
    </div>
  </q-form>
</template>

<script setup>
// import
import WeaponCard from 'components/profiles/add/WeaponCard.vue'
import OpticCard from 'components/profiles/add/OpticCard.vue'
import BulletCard from 'components/profiles/add/BulletCard.vue'
import { defineEmits } from 'vue'

// props
const {
  profile,
  submitText,
  submitIcon
} = defineProps({
  profile: {
    type: Object,
    required: true
  },
  submitText: {
    type: String,
    required: true
  },
  submitIcon: {
    type: String,
    required: false,
    default: 'add'
  }
})

const emit = defineEmits(['submit'])

// form submit
const submitProfile = () => {
  emit('submit', profile)
}
</script>
