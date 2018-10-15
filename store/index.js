import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  map: null,
  watchHandle: null,
  camera: {
    position: {
      x: -9177356,
      y: 4246783,
      z: 723,
      spatialReference: {
        wkid: 3857
      }
    },
    heading: 0,
    tilt: 83
  },
  dummydata: [
    {
      geometry: {
        type: 'point',
        longitude: -76.57298,
        latitude: 37.157177
      },
      symbol: {
         type: 'picture-marker',
         url: 'static/images/tradoc-logo.png',
         width: '32px',
         height: '32px'
        // type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
        // color: [226, 119, 40],
        // outline: { // autocasts as new SimpleLineSymbol()
        //  color: [255, 255, 255],
        //  width: 2
        // }
      }
    },
    {
      geometry: {
        type: 'point',
        longitude: -85.715375,
        latitude: 31.340052
      },
      symbol: {
        type: 'picture-marker',
        url: 'static/images/CIMT.png',
        width: '32px',
        height: '32px'
      }
    }
  ]
}

export default new Vuex.Store({
  state
})
