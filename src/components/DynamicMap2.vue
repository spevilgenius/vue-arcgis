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
// import { loadModules } from 'esri-loader'
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
    var myMap, view;
    require([
      "esri/Basemap",
      "esri/layers/TileLayer",
      "esri/Map",
      "esri/views/MapView",
      "dojo/domReady!"
    ], function (Basemap, TileLayer, Map, MapView) {
      var layer = new TileLayer({
        url: "https://www.example.com/arcgis/rest/services/Folder/Custom_Base_Map/MapServer"
      });
      var customBasemap = new Basemap({
        baseLayers: [layer],
        title: "Custom Basemap",
        id: "myBasemap"
      });
      myMap = new Map({
        basemap: customBasemap
      });
      view = new MapView({
        center: [-111.87, 40.57], // long, lat
        container: "viewDiv",
        map: myMap,
        zoom: 6
      });
    });
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
