<template>
  <div id="pagewrapper">
    <div class="toolbar" id="toolbar">
      <!--<b-btn size="sm" @click="toggleMap">Switch To Map</b-btn>-->
      <router-link to="/" class="btn btn-success">Switch To Map</router-link>
    </div>
    <div class="ganttwrapper" id="ganttdivwrapper">
      <div class="gantt" id="ganttdiv"></div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
  import JQuery from 'jquery'
  let jQuery = JQuery
var listdata = require('../listdata')
var instance = null
export default {
  name: 'dynamic-gantt',
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
    init: function () {

      var h = jQuery("#ganttdivwrapper").height() + 'px'
      var w = jQuery("#ganttdivwrapper").width() + 'px'
      console.log("w: " + w + ", h: " + h)
      jQuery("#ganttdiv").css({ "height": h })
      jQuery("#ganttdiv").css({ "width": w })

      gantt.config.columns = [
        {
          name: "text", label: "Phase", width: "*", tree: true
        },
        {
          name: "start", label: "Start Date", template: function (obj) {
            return gantt.templates.date_grid(obj.start_date);
          }, align: "center", width: 100
        },
        {
          name: "duration", label: "Duration", align: "center", width: 60
        },
        {
          name: "add", label: "", width: 44
        }
      ];

      gantt.config.grid_width = 346;
      gantt.config.xml_date = "%m/%d/%Y";
      gantt.config.date_grid = "%F %d";
      gantt.config.scale_height = 60;
      gantt.config.fit_tasks = true;

      gantt.init('ganttdiv')
    },
    toggleMap: function () {

    },
    getMissions: function () {
      // get mission data from SharePoint
    }
  },
  mounted: function () {
    instance.init()
  }
}
</script>
<style>
  #pagewrapper {
    height: 100vh;
    width: 100%;
  }

  #ganttdivwrapper {
    height: 90vh;
    width: 100%;
    z-index: 100;
  }

  #toolbar {
    height: 10vh;
    width: 100%;
  }

  .panel-body {
    min-height: 100px;
  }

  .widgetbody {
    width: 100%;
    min-height: 100px;
    position: relative;
  }
</style>
