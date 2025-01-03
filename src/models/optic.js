export default function () {
  return {
    name: '',
    type: 'red dot', // 'red dot','prism','scope'
    zoom: 1, // 1,2,3,...n, [1,10]
    elevationClickValue: 0.5,
    elevationClickUnit: 'MOA', // 'MOA', 'MRAD'
    windageClickValue: 0.5,
    windageClickUnit: 'MOA', // 'MOA', 'MRAD'
    reticle: 'MOA', // 'MOA', 'MRAD'
    dotSize: 1, // center dot size for red dot
    focalPlane: 'second' // 'first', 'second'
  }
}
