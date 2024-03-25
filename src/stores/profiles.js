import { defineStore } from 'pinia'

export const useProfilesStore = defineStore('profiles', {
  state: () => ({
    profilesArray: [],
    nextId: 1
  }),

  getters: {
    profiles: (state) => {
      return state.profilesArray
    },

    profilebyId: (state) => (id) => {
      return state.profilesArray.find(profile => profile.id === id)
    }
  },
  actions: {
    addProfile (newProfile) {
      // set unique Id
      newProfile.id = this.nextId
      // increment next Id
      this.nextId++

      this.profilesArray.push(newProfile)
    },
    removeProfile (id) {
      const index = this.profilesArray.findIndex(profile => profile.id === id)
      if (index !== -1) {
        this.profilesArray.splice(index, 1)
      }
    },
    updateProfile (updatedProfile) {
      const index = this.profilesArray.findIndex(profile => profile.id === updatedProfile.id)
      if (index !== -1) {
        this.profilesArray[index] = updatedProfile
      }
    },
    duplicateProfile (id) {
      const profileToDuplicate = this.profilebyId(id)
      if (profileToDuplicate) {
        const duplicatedProfile = JSON.parse(JSON.stringify(profileToDuplicate))
        duplicatedProfile.id = this.nextId
        this.nextId++

        // add - Copy suffix
        duplicatedProfile.weapon.name += ' - Copy'

        this.profilesArray.push(duplicatedProfile)
      }
    }
  },
  persist: true
})
