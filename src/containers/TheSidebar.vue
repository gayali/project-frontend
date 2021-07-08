<template>
  <CSidebar fixed :minimize="minimize" :show="show"
    @update:show="(value) => $store.dispatch('sidebar/setSidebarShow', value)">
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon class="c-sidebar-brand-full" name="logo" size="custom-size" :height="35" viewBox="0 0 556 134" />
      <CIcon class="c-sidebar-brand-minimized" name="logo" size="custom-size" :height="35" viewBox="0 0 110 134" />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="sidebarData" />

    <CSidebarMinimizer class="d-md-down-none"
      @click.native="$store.dispatch('sidebar/setSidebarMinimize', !minimize)" />
  </CSidebar>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    name: 'TheSidebar',
    computed: {
      ...mapGetters({
        sidebarShow: 'sidebar/sidebarShow',
        sidebarMinimize: 'sidebar/sidebarMinimize',
        sidebarData: 'sidebar/sidebarData',
        projects: 'projects/projects'
      }),
      show() {
        return this.sidebarShow
      },
      minimize() {
        return this.sidebarMinimize
      }
    },

    beforeCreate() {
      this.$store.dispatch('projects/fetch').then(() => {
        let sidebarDataList = []

        let item = {
          _name: 'CSidebarNavItem',
          name: 'Dashboard',
          to: '/dashboard',
          icon: 'cil-speedometer',
        }

        sidebarDataList.push(item)

        item = {
          _name: 'CSidebarNavItem',
          name: 'New Project',
          to: '/projects/new',
          icon: 'cil-calculator',
        }
        sidebarDataList.push(item)

        item = {
          _name: 'CSidebarNavDivider',
          class: 'm-2',
        }
        sidebarDataList.push(item)

        item = {
          _name: 'CSidebarNavDivider',
          class: 'm-2',
        }
        sidebarDataList.push(item)

        for (let i = 0; i < this.projects.length; i++) {
          const project = this.projects[i];

          item = {
            _name: 'CSidebarNavTitle',
            _children: [project.project_name],
          }
          sidebarDataList.push(item)

          item = {
            _name: 'CSidebarNavItem',
            name: 'Kanban',
            to:'/projects/kanban/' + project.id,
            icon: 'cil-chart-pie'
          }
          sidebarDataList.push(item)


          item = {
            _name: 'CSidebarNavItem',
            name: 'Backlogs',
            to:'/projects/backlog/' + project.id,
            icon: 'cil-layers'
          }
          sidebarDataList.push(item)

          item = {
            _name: 'CSidebarNavItem',
            name: 'Details',
            to:'/projects/details/' + project.id,
            icon: 'cil-star'
          }
          sidebarDataList.push(item)
        }

        sidebarDataList = [{
          _name: 'CSidebarNav',
          _children: sidebarDataList
        }]

        this.$store.dispatch('sidebar/setSidebarData', sidebarDataList)

      })


    }
  }
</script>