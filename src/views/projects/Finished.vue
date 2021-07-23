<template>
    <div>
        <CRow>
            <CCol col="12" xl="8">
                <CCard>
                    <CCardHeader>
                        <strong> Finished</strong>
                    </CCardHeader>
                    <CCardBody class="text-center">
                        <CSpinner v-if="loading || taskLoading" color="primary " size="lg" />
                        <CListGroup>
                            <CListGroupItem tag="button" v-for="task in finishedTask" v-bind:key="task.id"
                                class="d-flex justify-content-between align-items-center" @click="setClickedUser(task)">
                                <strong> {{task.task_title}}</strong>
                                <CBadge color="primary" shape="pill">{{task.branch_name}}</CBadge>
                            </CListGroupItem>
                        </CListGroup>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>


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
    export default {
        name: 'Finished',
        components: {
            TaskDetails,
            Modal
        },
        computed: {
            ...mapGetters({
                tasks: 'tasks/tasks',
                taskLoading:'tasks/loading',
            }),
            finishedTask() {

                let tasks = Object.entries(this.tasks)
                if (tasks.length !== 0) {
                    return this.tasks.filter((task) => {
                        return (task.status === TaskTypes.FINISHED)
                    })
                }

            }
        },
        data() {
            return {
                loading: false,
                projectTask: [],
                task: {},
                openDetailModal: false
            };
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
            async onClose() {
                this.openDetailModal = false
                this.task = {}
                await this.$store.dispatch('tasks/fetch')
            }
        },
        async beforeMount() {
            let tasks=Object.entries(this.tasks)
            if(tasks.length===0) await this.$store.dispatch('tasks/fetch')
            this.getProjectTasks()
        },
    }
</script>