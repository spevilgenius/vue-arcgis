<template>
  <div id="mapwrapper">
    <div class="toolbar" id="toolbar">
      <b-btn v-if="ready" size="sm" @click="addLists">Add Lists</b-btn>
    </div>
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
var $ = require('jquery')(window)
var listdata = require('../listdata')
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
      listsexist: false,
      ready: false,
      isdev: true,
      message: null,
      count: 0,
      total: 0,
      wsu: _spPageContextInfo.webAbsoluteUrl
    }
  },
  created: function () {
    instance = this
    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () {
      instance.ready = true
      console.log("URL: " + instance.wsu)
    })
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
    addLists: function () {
      for (var i = 0; i < listdata.lists.length; i++) {
        console.log(listdata.lists[i].title)
        instance.total += 1
        var ctx = new SP.ClientContext.get_current()
        var lci = new SP.ListCreationInformation()
        lci.set_title(listdata.lists[i].title)
        lci.set_description(listdata.lists[i].description)
        lci.set_templateType(SP.ListTemplateType.genericList)
        ctx.get_web().get_lists().add(lci)

        ctx.executeQueryAsync(
          this.listAdded
          , function (sender, args) {
            console.log("Error because list already exists or you are a goober " + args.get_message())
        })
      }
    },
    listAdded: function () {
      instance.count += 1
      console.log("List Done: " + instance.total + ", " + instance.count)
      if (instance.count === instance.total) {
        instance.count = 0
        instance.total = 0
        for (var i = 0; i < listdata.lists.length; i++) {
          instance.total += 1
          var ctx = new SP.ClientContext.get_current()
          var list = ctx.get_web().get_lists().getByTitle(listdata.lists[i].title)
          var field_name

          for (var j = 0; j < listdata.lists[i].fields.length; j++) {
            console.log("Field: " + listdata.lists[i].fields[j].Title)
            var field = listdata.lists[i].fields[j]

            var rich_text;
            if (field.Type === 'Note') {
              if (field.Format === 'Plain') {
                rich_text = ' RichText="FALSE"'
              } else {
                rich_text = ' RestrictedMode="TRUE" RichText="TRUE" RichTextMode="FullHtml"'
              }
            } else {
              rich_text = ''
            }

            var date = (field.Type === 'DateTime' ? ' Format="' + field.Format + '"' : '')

            if (field.Type === 'Choice') {
              var dropdownChoices = (field.Type === 'Choice' ? field.Choices.split(',') : [])
              var choiceDropDownField = ctx.castTo(list.get_fields().addFieldAsXml('<Field Type="Choice" DisplayName="' + field.DisplayName + '" Name="' + field.Title + '" Required="' + field.Required.toUpperCase() + '" Format="Dropdown" />', true, SP.AddFieldOptions.addToDefaultContentType), SP.FieldChoice)
              choiceDropDownField.set_choices(dropdownChoices)
              choiceDropDownField.update()
            } else if (field.Type === 'Title') {
              var fc = list.get_fields()
              field_name = fc.getByTitle("Title")
              field_name.set_title(field.DisplayName)
              field_name.set_required(true)
              field_name.update()
            } else if (field.Type === 'MultiChoice') {
              var mdropdownChoices = field.Choices.split(',')
              var mdc = '<Field Type="MultiChoice" DisplayName="' + field.DisplayName + '" Name="' + field.Title + '" Required="' + field.Required.toUpperCase() + '" >'
              mdc += '<CHOICES>'
              for (var k = 0; k < mdropdownChoices.length; k++) {
                mdc += '<CHOICE>' + mdropdownChoices[k] + '</CHOICE>'
              }
              mdc += '</CHOICES></Field>'
              field_name = list.get_fields().addFieldAsXml(mdc, true)
              field_name.update()
            } else {
              field_name = list.get_fields().addFieldAsXml('<Field Type="' + field.Type + '" DisplayName="' + field.DisplayName + '" Name="' + field.Title + '" Required="' + field.Required.toUpperCase() + '"' + rich_text + date + ' />', true, SP.AddFieldOptions.addToDefaultContentType)
              field_name.update()
            }

            ctx.load(field_name)
          }

          ctx.executeQueryAsync(
            this.fieldsAdded
            , function (sender, args) {
              console.log("Error adding fields to list " + args.get_message())
            })
        }
      }
    },
    fieldsAdded: function () {
      instance.count += 1;
      if (instance.count === instance.total) {
        console.log("All lists and fields created.")
      }
    },
    addMission: function () {
      alert('Add Mission for point at ' + this.latitude + ', ' + this.longitude)
    },
    addLNO: function () {
      alert('Add LNO for point at ' + this.latitude + ', ' + this.longitude)
    }
  },
  mounted: function () {    
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
            url: '/sites/msct2/SiteAssets/html/static/img/tradoc-logo.png',
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
