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
                                class="d-flex justify-content-between align-items-center" @click="$router.push({name:'Task Details', query: { task: JSON.stringify(task) } })">
                                <strong> {{task.task_title}}</strong>
                                <CBadge color="primary" shape="pill">{{task.branch_name}}</CBadge>
                            </CListGroupItem>
                        </CListGroup>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
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
                         return (task.project_id == this.$route.query.id && task.status === TaskTypes.FINISHED)

                    })
                }

            }
        },
        data() {
            return {
                loading: false,
                openDetailModal: false
            };
        },
        async beforeMount() {
            let tasks=Object.entries(this.tasks)
            if(tasks.length===0) await this.$store.dispatch('tasks/fetch')
        },
    }

</script>