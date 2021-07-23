<template>
    <div class="kanban-view-class">
        <div class="d-inline-flex">
            <CCard class="bg-section m-1 " v-for="taskType in taskTypes.allKanbanTypes" v-bind:key="taskType">
                <CCardHeader class="text-center">
                    <h6 class="m-0"><strong>{{taskType}}</strong></h6>
                </CCardHeader>
                <CCardBody class="px-2">
                    <div class="text-center m-4" >
                         <CSpinner  v-if="taskLoading" color="primary " size="lg" />
                    </div>
                     
                    <template v-for="task in tasks">
                        <CCard class="task-card" v-bind:key="task.id" v-if="task.status===taskType && !taskLoading"
                            @click="$router.push({name:'Task Details', query: { task: JSON.stringify(task) } })">
                            <CCardBody>
                                <CRow class="mb-4">
                                    <CCol col="12">
                                        <CBadge color="primary">{{task.branch_name}}</CBadge>
                                    </CCol>
                                    <CCol col="12">{{task.task_title}}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol col="9">
                                        <CIcon name="cilCalendar" class="icon-bal mr-1" />
                                        {{task.updated_at|moment }}
                                    </CCol>

                                    <CCol col="3" class="text-right">
                                        <avatar :username="task.asignee_user.name" :size="30" style="float:right"
                                            v-c-tooltip.hover="task.asignee_user.name">
                                        </avatar>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </template>

                </CCardBody>
            </CCard>

        </div>
    </div>

</template>

<script>
    import Modal from '../components/Modal.vue'
    import {
        mapGetters
    } from "vuex"
    import TaskDetails from './tasks/TaskDetails'
    import TaskTypes from '../../enums/taskTypes'
    import Avatar from 'vue-avatar'
    import moment from 'moment'
    export default {
        name: 'Kanban',
        components: {
            TaskDetails,
            Modal,
            Avatar
        },
        computed: {
            ...mapGetters({
                tasks: 'tasks/tasks',
                taskLoading: 'tasks/loading',
            }),
        },
        data() {
            return {
                loading: false,
                projectTask: [],
                task: {},
                openDetailModal: false,
                taskTypes: TaskTypes,

            };
        },
        filters: {
            moment: function (date) {
              //   moment(date).format('DD/MM/YYYY');
               return moment(date).fromNow()
            }
        },
        methods: {
            getProjectTasks() {
                this.loading = true
                for (let i = 0; i < this.tasks.length; i++) {
                    const task = this.tasks[i];
                    if (task.project_id === parseInt(this.$route.query.id)) {
                        this.projectTask.push(task)
                    }
                }
                this.loading = false
            },
        },
        async beforeMount() {
            let tasks = Object.entries(this.tasks)
            if (tasks.length === 0) await this.$store.dispatch('tasks/fetch')
            this.getProjectTasks()
        },
    }
</script>
<style scoped>
    .kanban-view-class {
        overflow-x: scroll;
        overflow-y: scroll;
        height: 70vh;
    }

    .bg-section {
        min-width: 250px;
        background-color: #f3f4f6;
    }

    .task-card {
        border-radius: 20px;
    }

    .icon-bal {
        margin-top: -3px;
    }
</style>