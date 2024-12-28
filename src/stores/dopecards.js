import { defineStore } from 'pinia'
import arDatasheetMetric from 'src/controller/ar-datasheet-metric'
import arDatasheetImperial from 'src/controller/ar-datasheet-imperial'
import { Share } from '@capacitor/share'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { Platform } from 'quasar'

export const useDopeCardsStore = defineStore('dope-cards', {
  state: () => ({
    profileId: null
  }),

  getters: {
    /*
    doubleCount (state) {
      return state.counter * 2
    }
    */
  },

  actions: {
    async downloadARdatasheetMetric () {
      if (this.profileId) {
        const pdfBytes = await arDatasheetMetric(this.profileId)
        await exportPdf(pdfBytes, 'testpdf.pdf')
      }
    },
    async downloadARdatasheetImperial () {
      if (this.profileId) {
        const pdfBytes = await arDatasheetImperial(this.profileId)
        await exportPdf(pdfBytes, 'testpdf.pdf')
      }
    }
  },
  persist: true
})

async function exportPdf (bytes, filename) {
  const int8array = new Uint8Array(bytes)
  const blob = new Blob([int8array], { type: 'application/pdf' })

  if (Platform.is.capacitor) {
    await sharePDF(blob, filename)
  } else {
    downloadPDF(blob, filename)
  }
}

async function sharePDF (pdfBlob, filename) {
  // Save the JSON file
  const result = await Filesystem.writeFile({
    path: filename,
    data: pdfBlob,
    directory: Directory.Cache,
    encoding: Encoding.UTF8
  })

  // Share the file
  try {
    await Share.share({
      title: 'ZRO Ballistic app - Export dope chart',
      text: 'Here is the exported dope chart for Excel.',
      url: result.uri, // Use the file's URI
      dialogTitle: 'Share dope chart'
    })
  } catch {
    // nothing
  }
}

function downloadPDF (pdfBlob, filename) {
  const url = URL.createObjectURL(pdfBlob)

  const a = document.createElement('a')
  a.href = url

  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
