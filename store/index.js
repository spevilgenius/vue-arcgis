/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  map: null,
  watchHandle: null,
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
      },
      title: 'TRADOC HQ',
      attributes: {
        type: 'graphic'
      }
    }
  ]
}

export default new Vuex.Store({ state })
