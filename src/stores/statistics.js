import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useProfilesStore } from './profiles'
import { useBallisticStore } from './ballistic'

export const useStatisticsStore = defineStore('statistics', () => {
  // other stores
  const profilesStore = useProfilesStore()
  const { profilesArray } = storeToRefs(profilesStore)
  const ballisticStore = useBallisticStore()
  const { nbTrajectories } = storeToRefs(ballisticStore)

  // states
  const nbProfiles = computed(() => profilesArray.value.length)

  return {
    nbProfiles,
    nbTrajectories
  }
})
