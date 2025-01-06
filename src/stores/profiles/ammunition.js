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
      notes: 'Example 5.56x45 bullet',
      weight: 55,
      weightUnit: 'GR',
      diameter: 0.223,
      diameterUnit: 'IN',
      ballisticCoefficient: 0.285,
      ballisticCoefficientProfile: 'G1',
      length: 0.746,
      lengthUnit: 'IN',
      usePowderSensitivity: false,
      powderModifier: 0,
      powderModifierUnit: 'FPS/°F'
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

    return newAmmunition.id
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

  function filterAmmunitionList (search) {
    if (search !== '') {
      return ammunitionList.value.filter(ammunition => ammunition.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
    } else return ammunitionList.value
  }

  function convertFPSbyFtoMPSbyC (value) {
    const mps = parseFloat(value) * 0.3048 * 5 / 9
    return Math.round(mps * 100) / 100
  }

  function convertMPSbyCtoFPSbyF (value) {
    const fps = parseFloat(value) * 1 / 0.3048 * 9 / 5
    return Math.round(fps * 100) / 100
  }

  // available
  return {
    ammunitionList,
    nextId,
    getAmmunition,
    getAmmunitionModel,
    addAmmunition,
    duplicateAmmunition,
    editAmmunition,
    removeAmmunition,
    filterAmmunitionList,
    convertFPSbyFtoMPSbyC,
    convertMPSbyCtoFPSbyF,
    predefinedAmmunitionList
  }
},
{ persist: true }
)
