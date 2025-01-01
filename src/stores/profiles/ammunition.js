import { defineStore } from 'pinia'
import { ref } from 'vue'
import ammunitionModel from 'src/models/ammunition'
import predefinedAmmunitionList from 'src/models/predefinedAmmunitionList.json'

export const useAmmunitionStore = defineStore('ammunition', () => {
  // state
  const ammunitionList = ref([
    {
      id: 1,
      name: 'M193 5.56x45',
      weight: 55,
      weightUnit: 'GR',
      diameter: 0.223,
      diameterUnit: 'IN',
      ballisticCoefficient: 0.285,
      ballisticCoefficientProfile: 'G1',
      length: 0.746,
      lengthUnit: 'IN'
    }
  ])
  const nextId = ref(2)

  // getters

  // actions
  function getAmmunition (id) {
    return ammunitionList.value.find(ammunition => ammunition.id === id)
  }

  function getAmmunitionModel () {
    return ammunitionModel()
  }

  function addAmmunition (newAmmunition) {
    newAmmunition.id = nextId.value
    nextId.value++
    ammunitionList.value.push({ ...newAmmunition })
  }

  function duplicateAmmunition (id) {
    const duplicatedAmmunition = {
      ...getAmmunition(id)
    }
    duplicatedAmmunition.name = 'Copy ' + duplicatedAmmunition.name
    addAmmunition(duplicatedAmmunition)
  }

  function editAmmunition (editedAmmunition) {
    const index = ammunitionList.value.findIndex(ammunition => ammunition.id === editedAmmunition.id)
    ammunitionList.value[index] = { ...editedAmmunition }
  }

  function removeAmmunition (id) {
    const index = ammunitionList.value.findIndex(ammunition => ammunition.id === id)
    ammunitionList.value.splice(index, 1)
  }

  function filterAmmunition (search) {
    if (search !== '') {
      return ammunitionList.value.filter(ammunition => ammunition.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
    } else return ammunitionList.value
  }

  // available
  return {
    ammunitionList,
    getAmmunition,
    getAmmunitionModel,
    addAmmunition,
    duplicateAmmunition,
    editAmmunition,
    removeAmmunition,
    filterAmmunition,
    predefinedAmmunitionList
  }
},
{ persist: true }
)
