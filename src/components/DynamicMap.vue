<template>
  <div id="mapwrapper">
    <div class="toolbar" id="toolbar"></div>
    <div class="map" id="mapdiv"></div>
    <b-modal id="ViewModal" ref="viewmodal" cancel-disabled centered title="Add Item To MASCOT">
      <b-container fluid>
        <div class="popSearch" id="popSearch">
          <b>Latitude: </b>{{latitude}}, <b>Longitude: </b>{{longitude}}<br />
          <a href="#" @click="addMission()">Add Mission</a><br />
          <a href="#" @click="addLNO()">Add LNO</a>
        </div>
      </b-container>
      <div slot="modal-footer" class="w-100"></div>
    </b-modal>
    <b-modal id="MissionModal" ref="missionmodal" cancel-disabled centered :title="title">
      <b-container fluid>
        <div class="popData" id="popData">
          <b>Latitude: </b>{{latitude}}, <b>Longitude: </b>{{longitude}}<br />
          <p>This is where the mission details will go</p>
        </div>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <b-btn size="sm" class="float-right" @click="hidepopup">
          Close
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>
<script>
/* eslint-disable */
import { loadModules } from 'esri-loader'
var instance = null
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
      title: '',
      map: null,
      latitude: null,
      longitude: null,
      geometry: null,
      feature: null,
      isdev: true
    }
  },
  methods: {
    getMissions: function () {
      // get mission data from SharePoint
    },
    setSearchpopup: function () {
      this.$refs['viewmodal'].show()
    },
    hidepopup: function () {
      this.$refs['missionmodal'].hide()
    },
    addMission: function () {
      alert('Add Mission for point at ' + this.latitude + ', ' + this.longitude)
    },
    addLNO: function () {
      alert('Add LNO for point at ' + this.latitude + ', ' + this.longitude)
    }
  },
  mounted: function () {
    instance = this
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/widgets/Search',
      'esri/layers/GraphicsLayer',
      'esri/Graphic',
      'esri/PopupTemplate'
    ], {
      // use a specific version instead of latest 4.x
      url: 'https://js.arcgis.com/4.9/'
    }).then(([Map, MapView, Search, GraphicsLayer, Graphic, PopupTemplate]) => {
      // create map with the given options at a DOM node w/ id 'mapNode'
      let map
      if (!this.$store.state.map) {
        map = new Map({
          basemap: 'streets'
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

      /* The ARCGIS api requires that there be a popuptemplate even though we will not use it,
        * it must be declared and set on each graphic */
      var popupTemplate = new PopupTemplate({
        title: 'PlaceHolder'
      })

      var searchWidget = new Search({
        view: view,
        popupOpenOnSelect: false // found this in an example as this was required to override the search popup
      })

      searchWidget.on('select-result', function (evt) {
        // The search widget event here causes the view popup to fire,
        // but the view popup is hidden with css as we are rolling our own bootstrap popup.
        // We still need to watch for it though so we can set the information for the popup and display it.
        instance.latitude = parseFloat(evt.result.feature.geometry.latitude).toFixed(5)
        instance.longitude = parseFloat(evt.result.feature.geometry.longitude).toFixed(5)
        instance.geometry = evt.result.feature.geometry
        instance.setSearchpopup()
      })

      // Add the search widget to the view. The sass files were updated to move the search widget to the top center and add some style
      view.ui.add(searchWidget, {
        position: 'top-right'
      })

      var missionlayer = new GraphicsLayer({
        id: 'missionlayer',
        title: 'Mission Layer'
      })

      map.add(missionlayer)

      view.when(function () {
        // Watch for when features are selected
        view.popup.watch('selectedFeature', function (graphic) {
          if (graphic && graphic.attributes.type === 'graphic') {
            // the purpose of the attributes type is because the search widget also uses the view popup so this separates the search from the layers
            // The view popup is hidden with css as we are rolling our own bootstrap popup.
            // We still need to watch for it though so we can set the information for the popup and display it.
            instance.latitude = graphic.geometry.latitude
            instance.longitude = graphic.geometry.longitude
            instance.title = graphic.title
            instance.$refs['missionmodal'].show()
          }
        })
      })

      view.popup.actions = []

      let location = String(window.location)
      if (location.indexOf('hq.') > 0) { this.isdev = false }

      if (this.isdev) {
        var dd = new Graphic({
          geometry: {
            type: 'point',
            longitude: -76.57298,
            latitude: 37.157177
          },
          symbol: {
            type: 'picture-marker',
            url: 'static/img/tradoc-logo.png',
            width: '32px',
            height: '32px'
          },
          title: 'TRADOC HQ',
          attributes: {
            type: 'graphic'
          }
        })
        missionlayer.graphics.add(dd)
      } else {
        // call the method to get data
      }
    })
  }
}
</script>
<style>
#mapwrapper {
  height: 100vh;
  width: 100%;
}
#toolbar {
  height: 10vh;
  width: 100%;
}
#txtSearch {
  width: 100%;
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
</style>
