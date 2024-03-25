import { defineStore } from 'pinia'
import { toRaw } from 'vue'

export const useProfilesStore = defineStore('profiles', {
  state: () => ({
    profilesArray: []
  }),

  getters: {
    /*
    name (index) {
      const profile = this.profilesArray[index]

      return profile.weapon.name || ' ' ||
             profile.optic.model || ' - ' ||
             profile.bullet.brand || ' ' ||
             profile.bullet.diameter || ' ' ||
             profile.bullet.weight || ', ' ||
             profile.bullet.weightUnit
    },
    */
    profiles () {
      return this.profilesArray
    },
    profile (index) {
      return this.profilesArray[index]
    }
  },
  actions: {
    insertProfile (newProfile) {
      this.profilesArray.push(newProfile)
    },
    removeProfile (index) {
      this.profilesArray.splice(index, 1)
    },
    editProfile (index, editedProfile) {
      this.profilesArray[index] = editedProfile
    },
    duplicateProfile (index) {
      // Object to duplicate
      const ProfileToDuplicate = toRaw(this.profilesArray[index])

      // Using spread operator to duplicate the object
      const duplicatedProfile = { ...ProfileToDuplicate }

      // Change weapon name with - Copy suffix
      duplicatedProfile.weapon.name += ' - Copy'

      // Inserting duplicated object at specific index
      this.profilesArray.splice(index + 1, 0, duplicatedProfile)
    }
  },
  persist: true
})
