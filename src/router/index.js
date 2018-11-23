import Vue from 'vue'
import Router from 'vue-router'
import MapLayout from '@/components/MapLayout'
import GanttLayout from '@/components/GanttLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MapLayout',
      component: MapLayout
    },
    {
      path: '/Gantt',
      name: 'GanttLayout',
      component: GanttLayout
    }
  ]
})
