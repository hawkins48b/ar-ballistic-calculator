import { defineStore } from 'pinia'
import { ref } from 'vue'
import setupModel from 'src/models/setup'
import { useAmmunitionStore } from './ammunition'
import { useOpticStore } from './optic'
import { useFirearmStore } from './firearm'

export const useSetupStore = defineStore('setup', () => {
  // state
  const setupList = ref([
    {
      name: 'Example AR15',
      id: 1,
      ammunitionId: 1,
      opticId: 1,
      firearmId: 1,
      measureOpticHeight: 1.5,
      measureOpticHeightUnit: 'IN',
      measureZeroDistance: 25,
      measureZeroDistanceUnit: 'YD',
      measureVelocity: 3000,
      measureVelocityUnit: 'FPS',
      measureVelocityTemperature: 59.3,
      measureVelocityTemperatureUnit: '°F'
    }
  ])
  const nextId = ref(2)

  const newSetup = ref(setupModel())

  // getters

  // actions
  function getSetup (id) {
    let setup = setupList.value.find(setup => setup.id === id)
    setup = populateSetup(setup)
    return setup
  }

  function getSetupModel () {
    return setupModel()
  }

  function addSetup (setup) {
    setup.id = nextId.value
    nextId.value = nextId.value + 1

    setupList.value.push({ ...setup })

    // clear new setup
    newSetup.value = getSetupModel()

    return setup.id
  }

  function duplicateSetup (id) {
    const duplicatedSetup = {
      ...getSetup(id)
    }
    duplicatedSetup.name = 'Copy ' + duplicatedSetup.name
    addSetup(duplicatedSetup)
  }

  function editSetup (editedSetup) {
    const index = setupList.value.findIndex(setup => setup.id === editedSetup.id)
    setupList.value[index] = { ...editedSetup }
  }

  function removeSetup (id) {
    const index = setupList.value.findIndex(setup => setup.id === id)
    setupList.value.splice(index, 1)
  }

  function filterSetup (search) {
    const populateSetupList = setupList.value.map(setup => {
      return populateSetup(setup)
    })
    if (search !== '') {
      return populateSetupList.filter(setup => {
        const searchIn = (setup.name + ' ' + setup.firearm.name + ' ' + setup.optic.name + ' ' + setup.ammunition.name).toLowerCase()
        return searchIn.indexOf(search.toLocaleLowerCase()) > -1
      })
    } else {
      return populateSetupList
    }
  }

  function populateSetup (setup) {
    const ammunitionStore = useAmmunitionStore()
    const opticStore = useOpticStore()
    const firearmStore = useFirearmStore()

    const ammunition = ammunitionStore.getAmmunition(setup.ammunitionId)
    const optic = opticStore.getOptic(setup.opticId)
    const firearm = firearmStore.getFirearm(setup.firearmId)

    setup.ammunition = ammunition ? { ...ammunition } : null
    setup.optic = optic ? { ...optic } : null
    setup.firearm = firearm ? { ...firearm } : null

    return setup
  }

  function setupStatus (setup) {
    let status = 'completed'

    if (!setup.firearm) {
      status = 'draft'
    }
    if (!setup.optic) {
      status = 'draft'
    }
    if (!setup.ammunition) {
      status = 'draft'
    }

    return status
  }

  // available
  return {
    setupList,
    nextId,
    newSetup,
    getSetup,
    getSetupModel,
    addSetup,
    duplicateSetup,
    editSetup,
    removeSetup,
    filterSetup,
    setupStatus
  }
},
{ persist: true }
)
