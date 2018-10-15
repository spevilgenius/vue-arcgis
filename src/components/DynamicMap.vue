<template>
  <div id="mapwrapper">
    <div class="toolbar" id="toolbar"></div>
    <div class="map" id="mapdiv"></div>
  </div>
</template>
<script>
import { loadModules } from 'esri-loader'
export default {
  name: 'dynamic-map',
  data: function () {
    return {
      items: [],
      site: '',
      list: '',
      action: '',
      dlgid: '',
      dlgbody: '',
      loading: true,
      loaded: false,
      isdev: true
    }
  },
  mounted: function () {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/core/watchUtils',
      'esri/widgets/Search',
      'esri/Graphic'
    ], {
      // use a specific version instead of latest 4.x
      url: 'https://js.arcgis.com/4.9/'
    }).then(([Map, MapView, watchUtils, Search, Graphic]) => {
      // create map with the given options at a DOM node w/ id 'mapNode'
      let map
      if (!this.$store.state.map) {
        map = new Map({
          basemap: 'satellite'
        })
        this.$store.state.map = map
      } else {
        map = this.$store.state.map
      }
      const view = new MapView({
        container: 'mapdiv',
        map,
        zoom: 3,
        center: [0, 0] // longitude, latitude
      })

      var searchWidget = new Search({
        view: view
      })

      // Add the search widget to the top right corner of the view
      view.ui.add(searchWidget, {
        position: 'top-right'
      })

      let location = String(window.location);
      if (location.indexOf('hq.') > 0) {
        this.isdev = false;
      }

      if (this.isdev) {
        for (var l = 0; l < this.$store.state.dummydata.length; l++) {
          view.graphics.add(this.$store.state.dummydata[l])
        }
      }
      else {

      }
      // return view
      /* this.$store.state.watchHandle = watchUtils.watch(view, 'camera', (camera) => {
        console.log('change')
        this.$store.state.camera = camera.clone().toJSON()
      }) */
    })
  },
  // beforeDestroy () {
  //  console.log('map: beforeDestroy')
  //  this.$store.state.watchHandle.remove()
  // },
  updated: function () {
    this.loading = false
    this.loaded = true
  }
}
</script>
<style scoped>
@import url('https://js.arcgis.com/4.2/esri/css/main.css');
#mapwrapper {
  height: 100vh;
  width: 100%;
}
#toolbar {
  height: 10vh;
  width: 100%;
  border: 2px solid black;
}
#mapdiv {
  height: 90vh;
  width: 100%;
  z-index: 100;
}
.panel-body { min-height: 100px; }
.widgetbody {
  width: 100%;
  min-height: 100px;
  position: relative;
}
.loading {
  color: #2df20f;
  font-size: 30px;
  line-height: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fa-spinner {
  color: #2df20f;
  font-size: 30px;
  line-height: 30px;
}
.status { width: 30px; }
.suspense { width: 100px; }
.Green { color: green; font-size: 16px; }
.Yellow { color: yellow; font-size: 16px; }
.Red { color: red; font-size: 16px; }
.Black { color: black; font-size: 16px; }

.table td, .table th {
  padding: .5rem;
}

.hovertitle { text-decoration: none !important; color: black !important; cursor: pointer; }

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-dialog {
  max-width: 800px;
  width: 800px;
}

.modal-body {
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: auto;
}
</style>
