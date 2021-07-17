<template>
    <div class="kanban-view-class">
        <div class="d-inline-flex">
            <CCard class="bg-section m-1 " v-for="taskType in taskTypes.allTypes" v-bind:key="taskType">
                <CCardHeader class="text-center">
                    <h5 class="m-0"><strong>{{taskType}}</strong></h5>
                </CCardHeader>
                <CCardBody class="px-2">
                    <template v-for="task in tasks">
                        <CCard class="task-card" v-bind:key="task.id" v-if="task.status===taskType" @click="setClickedUser(task)" >
                            <CCardBody>
                                <CRow class="mb-4">
                                    <CCol col="12">
                                        <CBadge color="primary" >{{task.branch_name}}</CBadge></CCol>
                                    <CCol col="12">{{task.task_title}}</CCol>
                                </CRow>
                                <CRow>
                                    <CCol col="7">
                                        <CIcon name="cilCalendar" class="icon-bal mr-1" />
                                        {{task.updated_at|moment }}
                                    </CCol>

                                    <CCol col="5" class="text-right">
                                        <avatar :username="task.asignee_user.name" :size="30" style="float:right">
                                        </avatar>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </template>

                </CCardBody>
            </CCard>

        </div>


        <Modal :shouldColored="false" :closeOnBackdrop="false" :title="'EDIT TASK'" size="lg" :actionButton="false"
            :closeButton="false" v-if="openDetailModal" @close="onClose">
            <TaskDetails :task="task"></TaskDetails>
        </Modal>
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
                return moment(date).format('DD/MM/YYYY');
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

            setClickedUser(task) {
                this.task = task
                this.openDetailModal = true
            },
            onClose() {
                this.openDetailModal = false
                this.task = {}
            }
        },
        mounted() {
            if (this.tasks === {} || this.tasks.length === 0 || this.tasks.length === undefined) {
                this.$store.dispatch('tasks/fetch').then(() => {
                    this.getProjectTasks()

                })
            } else {
                this.getProjectTasks()
            }
        }
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