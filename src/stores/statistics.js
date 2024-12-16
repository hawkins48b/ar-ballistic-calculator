import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useProfilesStore } from './profiles'

export const useStatisticsStore = defineStore('statistics', () => {
  // other stores
  const profilesStore = useProfilesStore()
  const { profilesArray } = storeToRefs(profilesStore)

  // states
  const nbProfiles = computed(() => profilesArray.value.length)

  return {
    nbProfiles
  }
})
