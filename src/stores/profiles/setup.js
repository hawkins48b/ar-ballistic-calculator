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
      firearmId: 1
    }
  ])
  const nextId = ref(2)

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

  function addSetup (newSetup) {
    newSetup.id = nextId.value
    nextId.value++
    setupList.value.push({ ...newSetup })
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

    console.log('status', setup)

    return status
  }

  // available
  return {
    setupList,
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
