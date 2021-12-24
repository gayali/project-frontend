<template>
    <div class="kanban-view-class">
        <div class="d-inline-flex">
            <CCard class="bg-section m-1 " v-for="taskType in taskTypes.allKanbanTypes" v-bind:key="taskType">
                <CCardHeader class="text-center">
                    <h6 class="m-0"><strong>{{taskType}}</strong></h6>
                </CCardHeader>
                <CCardBody class="px-2 py-1">
                    <div class="text-center m-4" v-if="taskLoading" >
                         <CSpinner  color="primary " size="lg" />
                    </div>
                     
                    <template v-for="task in tasks">
                        <CCard class="my-2 task-card" v-bind:key="task.id" v-if="task.status===taskType && task.project_id==$route.query.id && !taskLoading"
                            @click="$router.push({name:'Task Details', query: { task: JSON.stringify(task) } })">
                            <CCardBody>
                                <CRow>
                                    <CCol col="2">
                                        <CBadge color="primary" size="sm">{{task.branch_name}}</CBadge>
                                    </CCol>
                                    
                                     <CCol col="10" class="text-right" v-if="task.status===taskTypes.BACKLOG || task.status===taskTypes.TODO || task.status===taskTypes.DOING">
                                         <CBadge color="tertiary" >
                                       <CIcon name="cilCalendar"  class="icon-bal mr-1" size="sm" />
                                        END : {{task.end_date|moment }}
                                         </CBadge>
                                    </CCol>
                                </CRow>
                                <CRow class="mt-2">
                                     <CCol col="12">{{task.task_title}}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol col="12" class="text-right">
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
    import {
        mapGetters
    } from "vuex"
    import TaskTypes from '../../enums/taskTypes'
    import Avatar from 'vue-avatar'
    import moment from 'moment'
    export default {
        name: 'Kanban',
        components: {
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
                task: {},
                openDetailModal: false,
                taskTypes: TaskTypes,

            };
        },
        filters: {
            moment: function (date) {
               return moment(date).fromNow()
            }

        },

        async beforeMount() {
            let tasks = Object.entries(this.tasks)
            if (tasks.length === 0) await this.$store.dispatch('tasks/fetch')
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
        cursor: pointer;
        border-radius: 15px;
    }

    .icon-bal {
        margin-top: -3px;
    }
</style>