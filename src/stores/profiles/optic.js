import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import opticModel from 'src/models/optic'

export const useOpticStore = defineStore('optic', () => {
  // state
  const opticList = ref([
    {
      id: 1,
      name: 'Aimpoint CompM2',
      type: 'red dot',
      zoom: '1',
      elevationClickValue: 0.5,
      elevationClickUnit: 'MOA',
      windageClickValue: 0.5,
      windageClickUnit: 'MOA',
      reticle: 'MOA',
      dotSize: 2
    }
  ])
  const nextId = ref(2)

  // getters
  const opticIcon = computed(() => {
    return (type) => {
      switch (type) {
        case 'red dot':
          return 'adjust'
        case 'prism':
          return 'center_focus_weak'
        case 'scope':
          return 'fiber_smart_record'
        default: return ''
      }
    }
  })

  // actions
  function getOptic (id) {
    return opticList.value.find(ammunition => ammunition.id === id)
  }

  function getOpticModel () {
    return opticModel()
  }

  function addOptic (newOptic) {
    newOptic.id = nextId.value
    nextId.value++
    opticList.value.push({ ...newOptic })
  }

  function duplicateOptic (id) {
    const duplicatedOptic = {
      ...getOptic(id)
    }
    duplicatedOptic.name = 'Copy ' + duplicatedOptic.name
    addOptic(duplicatedOptic)
  }

  function editOptic (editedOptic) {
    const index = opticList.value.findIndex(optic => optic.id === editedOptic.id)
    opticList.value[index] = { ...editedOptic }
  }

  function removeOptic (id) {
    const index = opticList.value.findIndex(optic => optic.id === id)
    opticList.value.splice(index, 1)
  }

  function filterOptic (search) {
    if (search !== '') {
      return opticList.value.filter(optic => optic.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1)
    } else return opticList.value
  }

  // available
  return {
    opticList,
    opticIcon,
    getOptic,
    getOpticModel,
    addOptic,
    duplicateOptic,
    editOptic,
    removeOptic,
    filterOptic
  }
},
{ persist: true }
)
