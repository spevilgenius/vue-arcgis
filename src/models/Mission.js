/* eslint-disable */
var Mission = module.exports = {
  attrubutes: {
    geometry: {
      type: 'point', // all missions are single points regarding map geometry
      longitude: null,
      latitude: null
    },
    symbol: {
      type: 'picture-marker', // all symbols will be picture-marker for this data model
      url: null,
      width: '32px', // height and width default to 32
      height: '32px'
    },
    title: null,
    organization: null,
    mission: {
      type: null,
      task: null,
      startdate: null,
      enddate: null
    },
    graphic: true // all missions are drawn as graphics but we define this to separate from search graphics
  },

  http: {

  },

  methods: {

  },

  computed: {

  }
}
