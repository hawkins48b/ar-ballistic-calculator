import { defineStore } from 'pinia'

export const useProfilesStore = defineStore('profiles', {
  state: () => ({
    profilesArray: [{
      id: 1,
      weapon: {
        name: 'Example Colt M4',
        barrelTwist: 0,
        barrelTwistUnit: 'IN'
      },
      optic: {
        model: 'Aimpoint CompM2',
        height: '3.5',
        heightUnit: 'IN'
      },
      bullet: {
        brand: 'M193',
        weight: 55,
        weightUnit: 'GR',
        diameter: 0.223,
        diameterUnit: 'IN',
        ballisticCoefficient: 0.285,
        ballisticCoefficientProfile: 'G1',
        length: 0,
        lengthUnit: 'IN'
      },
      measures: {
        velocity: 3000,
        velocityUnit: 'FPS',
        temperatureModifier: 0.00,
        temperature: 59,
        temperatureUnit: '°F',
        accuracy: 2,
        accuracyUnit: 'MOA'
      },
      options: {
        enableSpinDrift: false,
        enablePowderSensitivity: false
      }
    }],
    nextId: 2
  }),

  getters: {
    profiles: (state) => {
      return state.profilesArray
    },

    profilebyId: (state) => (id) => {
      return state.profilesArray.find(profile => profile.id === id)
    },

    profileLabel: (state) => (id) => {
      const profile = state.profilebyId(id)
      let label = ''
      if (profile) {
        label = profile.weapon.name + ' with ' +
                profile.optic.model + ' - ' +
                profile.bullet.brand + ' ' +
                profile.bullet.diameter + ' at ' +
                profile.measures.velocity + ' ' +
                profile.measures.velocityUnit
      }

      return label
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
