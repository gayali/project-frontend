<template>
  <div>

    <CRow>
      <CCol md="12">
        <CCard>
          <CCardHeader>
            Project &amp; Statistics
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm="12" lg="6">
                <CRow>
                  <CCol sm="6">
                    <CCallout color="danger">
                      <small class="text-muted">Total Projects</small><br>
                      <CSpinner v-if="calculateLoading" color="dark" size="lg" class="mx-auto" />
                      <strong class="h4">{{totalProjects||0}}</strong>
                    </CCallout>
                  </CCol>
                  <CCol sm="6">
                    <CCallout color="warning">
                      <small class="text-muted">Total Todos</small><br>
                      <CSpinner v-if="calculateLoading" color="dark" size="lg" class="mx-auto" />
                      <strong class="h4">{{totalTodos}}</strong>
                    </CCallout>
                  </CCol>
                </CRow>
                <hr class="mt-0">


              </CCol>
              <CCol sm="12" lg="6">
                <CRow>
                  <CCol sm="6">
                    <CCallout color="primary">
                      <small class="text-muted">Total Backlogs</small><br>
                      <CSpinner v-if="calculateLoading" color="dark" size="lg" class="mx-auto" />
                      <strong class="h4">{{totalBacklogs}}</strong>
                    </CCallout>
                  </CCol>
                  <CCol sm="6">
                    <CCallout color="success">
                      <small class="text-muted">Total Doings</small><br>
                      <CSpinner v-if="calculateLoading" color="dark" size="lg" class="mx-auto" />
                      <strong class="h4">{{totalDoings}}</strong>
                    </CCallout>
                  </CCol>

                </CRow>
                <hr class="mt-0">

              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
  import {
    mapGetters
  } from "vuex"
  import TaskTypes from '../enums/taskTypes'
  export default {
    name: 'Dashboard',
    data() {
      return {
        calculateLoading: false
      }
    },
    computed: {
      ...mapGetters({
        projects: 'projects/projects',
        tasks: 'tasks/tasks',
      }),
      totalProjects() {
        return this.projects.length
      },
      totalBacklogs() {
        this.calculateLoading = true
        let backlogTasks = 0
        for (let i = 0; i < this.tasks.length; i++) {
          const task = this.tasks[i];
          if (task.status === TaskTypes.BACKLOG) backlogTasks += 1
        }
        this.calculateLoading = false
        return backlogTasks
      },
      totalTodos() {
        this.calculateLoading = true
        let todoTasks = 0
        for (let i = 0; i < this.tasks.length; i++) {
          const task = this.tasks[i];
          if (task.status === TaskTypes.TODO) todoTasks += 1
        }
        this.calculateLoading = false
        return todoTasks
      },
      totalDoings() {
        this.calculateLoading = true
        let doingTask = 0
        for (let i = 0; i < this.tasks.length; i++) {
          const task = this.tasks[i];
          if (task.status === TaskTypes.DOING) doingTask += 1
        }
        this.calculateLoading = false
        return doingTask
      },
    },
    beforeCreate() {
      if (this.tasks === {}) this.$store.dispatch('tasks/fetch')
    }
  }
</script>