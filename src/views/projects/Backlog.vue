<template>
    <CRow>
        <CCol col="12" xl="8">
            <CCard>
                <CCardHeader>
                    <strong> Backlogs</strong>
                </CCardHeader>
                <CCardBody>
                    <CSpinner v-if="loading" color="primary" size="lg" />
                    <CListGroup>
                        <CListGroupItem tag="button" v-for="task in tasks" v-bind:key="task.id"
                            class="d-flex justify-content-between align-items-center" @click="$route.push({name:'Task Details',query:{task:task}})">
                            <strong> {{task.task_title}}</strong>
                            <CBadge color="primary" shape="pill">{{task.branch_name}}</CBadge>
                        </CListGroupItem>
                    </CListGroup>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    import {
        mapGetters
    } from "vuex"
    export default {
        name: 'Backlog',
        computed: {
            ...mapGetters({
                tasks: 'tasks/tasks',
            }),
        },
        data() {
            return {
                loading: false,
                projectTask: []
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