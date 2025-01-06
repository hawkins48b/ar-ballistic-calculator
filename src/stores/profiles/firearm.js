import { defineStore } from 'pinia'
import { ref } from 'vue'
import firearmModel from 'src/models/firearm'

export const useFirearmStore = defineStore('firearm', () => {
  // state
  const firearmList = ref([
    {
      id: 1,
      name: 'Colt AR15',
      notes: 'Example',
      barrelLength: 14.5,
      barrelLengthUnit: 'IN',
      barrelTwist: 7,
      barrelTwistUnit: 'IN'
    }
  ])
  const nextId = ref(2)

  // getters

  // actions
  function getFirearm (id) {
    return firearmList.value.find(firearm => firearm.id === id)
  }

  function getFirearmModel () {
    return firearmModel()
  }

  function addFirearm (newFirearm) {
    newFirearm.id = nextId.value
    nextId.value++
    firearmList.value.push({ ...newFirearm })

    return newFirearm.id
  }

  function duplicateFirearm (id) {
    const duplicatedFirearm = {
      ...getFirearm(id)
    }
    duplicatedFirearm.name = 'Copy ' + duplicatedFirearm.name
    addFirearm(duplicatedFirearm)
  }

  function editFirearm (editedFirearm) {
    const index = firearmList.value.findIndex(firearm => firearm.id === editedFirearm.id)
    firearmList.value[index] = { ...editedFirearm }
  }

  function removeFirearm (id) {
    const index = firearmList.value.findIndex(firearm => firearm.id === id)
    firearmList.value.splice(index, 1)
  }

  function filterFirearmList (search) {
    if (search !== '') {
      return firearmList.value.filter(firearm => firearm.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
    } else return firearmList.value
  }

  // available
  return {
    firearmList,
    nextId,
    getFirearm,
    getFirearmModel,
    addFirearm,
    duplicateFirearm,
    editFirearm,
    removeFirearm,
    filterFirearmList
  }
},
{ persist: true }
)
