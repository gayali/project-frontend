<template>
    <div>
        <CRow>
            <CCol col="12" xl="8">
                <CCard>
                    <CCardHeader>
                        <strong> Backlogs</strong>
                    </CCardHeader>
                    <CCardBody class="text-center">
                        <CSpinner v-if="loading"  color="primary " size="lg" />
                        <CListGroup>
                            <CListGroupItem tag="button" v-for="task in tasks" v-bind:key="task.id"
                                class="d-flex justify-content-between align-items-center" @click="setClickedUser(task)">
                                <strong> {{task.task_title}}</strong>
                                <CBadge color="primary" shape="pill">{{task.branch_name}}</CBadge>
                            </CListGroupItem>
                        </CListGroup>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
  

    <Modal :shouldColored="false" :noCloseOnBackdrop="false" :title="task.task_title" :closeTitle="'CLOSE'"
        v-if="openDetailModal" @close="onClose">
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
    export default {
        name: 'Backlog',
        components: {
            TaskDetails,
            Modal
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
                openDetailModal:false
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
                 this.openDetailModal=true
            },
            onClose() {
                this.openDetailModal=false
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