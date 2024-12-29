import { defineStore } from 'pinia'
import arDatasheetMetric from 'src/controller/ar-datasheet-metric'
import arDatasheetImperial from 'src/controller/ar-datasheet-imperial'
import { Share } from '@capacitor/share'
import { Filesystem, Directory } from '@capacitor/filesystem'
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
        const pdfDoc = await arDatasheetMetric(this.profileId)
        await exportPdf(pdfDoc, 'mid-range-dope-card.pdf')
      }
    },
    async downloadARdatasheetImperial () {
      if (this.profileId) {
        const pdfDoc = await arDatasheetImperial(this.profileId)
        await exportPdf(pdfDoc, 'mid-range-dope-card.pdf')
      }
    }
  },
  persist: true
})

async function exportPdf (pdfDoc, filename) {
  if (Platform.is.capacitor) {
    await sharePDF(pdfDoc, filename)
  } else {
    downloadPDF(pdfDoc, filename)
  }
}

async function sharePDF (pdfDoc, filename) {
  const base64Pdf = await pdfDoc.saveAsBase64()

  // Save the JSON file
  const result = await Filesystem.writeFile({
    path: filename,
    data: base64Pdf,
    directory: Directory.Cache
  })

  // Share the file
  try {
    await Share.share({
      title: 'ZRO Ballistic app - Export dope chart',
      text: 'Here is the exported dope chart for your printer',
      url: result.uri, // Use the file's URI
      dialogTitle: 'Share dope chart'
    })
  } catch {
    // nothing
  }
}

function downloadPDF (pdfDoc, filename) {
  const pdfBlob = pdfDoc.save()
  const url = URL.createObjectURL(pdfBlob)

  const a = document.createElement('a')
  a.href = url

  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
