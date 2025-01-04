import { defineStore } from 'pinia'
import { ref } from 'vue'
import profileModel from 'src/models/profile'
import { useAmmunitionStore } from './ammunition'
import { useOpticStore } from './optic'
import { useFirearmStore } from './firearm'

export const useProfileStore = defineStore('profile', () => {
  // state
  const profileList = ref([
    {
      id: 1,
      ammunitionId: 1,
      opticId: 1,
      firearmId: 1
    }
  ])
  const nextId = ref(2)

  // getters

  // actions
  function getProfile (id) {
    let profile = profileList.value.find(profile => profile.id === id)
    profile = populateProfile(profile)
    return profile
  }

  function getProfileModel () {
    return profileModel()
  }

  function addProfile (newProfile) {
    newProfile.id = nextId.value
    nextId.value++
    profileList.value.push({ ...newProfile })
  }

  function duplicateProfile (id) {
    const duplicatedProfile = {
      ...getProfile(id)
    }
    duplicatedProfile.name = 'Copy ' + duplicatedProfile.name
    addProfile(duplicatedProfile)
  }

  function editProfile (editedProfile) {
    const index = profileList.value.findIndex(profile => profile.id === editedProfile.id)
    profileList.value[index] = { ...editedProfile }
  }

  function removeProfile (id) {
    const index = profileList.value.findIndex(profile => profile.id === id)
    profileList.value.splice(index, 1)
  }

  function filterProfile (search) {
    if (search !== '') {
      return profileList.value.filter(profile => profile.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
    } else return profileList.value
  }

  function populateProfile (profile) {
    const ammunitionStore = useAmmunitionStore()
    const opticStore = useOpticStore()
    const firearmStore = useFirearmStore()

    const ammunition = ammunitionStore.getAmmunition(profile.ammunitionId)
    const optic = opticStore.getOptic(profile.opticId)
    const firearm = firearmStore.getFirearm(profile.firearmId)

    profile.ammunition = ammunition ? { ...ammunition } : null
    profile.optic = optic ? { ...optic } : null
    profile.firearm = firearm ? { ...firearm } : null

    return profile
  }

  // available
  return {
    profileList,
    getProfile,
    getProfileModel,
    addProfile,
    duplicateProfile,
    editProfile,
    removeProfile,
    filterProfile
  }
},
{ persist: true }
)
