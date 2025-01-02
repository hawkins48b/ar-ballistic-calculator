export default function () {
  return {
    name: '',
    type: 'red dot', // 'red dot','prism','scope'
    zoom: 1, // 1,2,3,...n, [1,10]
    clickValue: 0.5,
    clickUnit: 'MOA', // 'MOA', 'MRAD'
    reticle: '', // 'MOA', 'MRAD'
    dotSize: 1 // center dot size for red dot
  }
}
