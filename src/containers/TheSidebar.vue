<template>
  <CSidebar fixed :minimize="minimize" :show="show"
    @update:show="(value) => $store.dispatch('sidebar/setSidebarShow', value)">
    <CSidebarBrand class="d-md-down-none" to="/">
      <!-- <CIcon class="c-sidebar-brand-full" name="logo" size="custom-size" :height="35" viewBox="0 0 556 134" /> -->
       <CImg  class="c-sidebar-brand-full" src="img/logo.png" :height="50" size="custom-size"></CImg>
           <CImg  class="c-sidebar-brand-minimized" src="img/small-logo.png" :height="50" size="custom-size"></CImg>
      <!-- <CIcon class="c-sidebar-brand-minimized" name="logo" size="custom-size" :height="35" viewBox="0 0 110 134" /> -->

     
    </CSidebarBrand>



    <CRenderFunction flat :content-to-render="sidebarData" />
    <CSpinner v-if="loading" color="light" size="lg" class="mx-auto" />
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
        projects: 'projects/projects',
        users: 'users/users',
        tasks: 'tasks/tasks',
        loading: 'projects/loading',
      }),
      show() {
        return this.sidebarShow
      },
      minimize() {
        return this.sidebarMinimize
      },
      
    },

    async beforeMount() {
      this.$store.dispatch('projects/setLoading', true)

      if (Object.entries(this.projects).length === 0) await this.$store.dispatch('projects/fetch')
      this.setSidebar()

    },
    watch: {
      projects(){
        this.setSidebar()
      }
    },
    methods: {
      setSidebar() {
        try {
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
              _name: 'CSidebarNavDropdown',
              name: 'Users',
              route: '/user',
              icon: 'cil-user',
              items: [{
                  name: 'Users Table',
                  to: '/user/users'
                },
                {
                  name: 'New User',
                  to: '/user/new'
                },

              ]
            },


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
              to: '/projects/kanban?id=' + project.id,
              icon: 'cil-chart-pie'
            }
            sidebarDataList.push(item)


            item = {
              _name: 'CSidebarNavItem',
              name: 'Backlogs',
              to: '/projects/backlog?id=' + project.id,
              icon: 'cil-layers'
            }
            sidebarDataList.push(item)

            item = {
              _name: 'CSidebarNavItem',
              name: 'Finished',
              to: '/projects/finished?id=' + project.id,
              icon: 'cil-check'
            }
            sidebarDataList.push(item)

            item = {
              _name: 'CSidebarNavItem',
              name: 'Details',
              to: '/projects/details?id=' + project.id,
              icon: 'cil-star'
            }
            sidebarDataList.push(item)
          }

          sidebarDataList = [{
            _name: 'CSidebarNav',
            _children: sidebarDataList
          }]

          this.$store.dispatch('sidebar/setSidebarData', sidebarDataList)

          if (this.users === {}) this.$store.dispatch('users/fetchAll')
          if (this.tasks === {}) this.$store.dispatch('tasks/fetch')
          this.$store.dispatch('projects/setLoading', false)
        } catch (e) {
          console.error(e)
          this.$store.dispatch('projects/setLoading', false)
        }
      }
    },
  }
</script>