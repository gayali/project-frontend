<template>
    <CRow>
        <CCol col="12" xl="8">
            <CCard>
                <CForm @submit.prevent="submit">
                    <CCardBody>
                        <CRow>
                            <CCol col="12">
                                <CInput placeholder="Enter Task Name" label="Task Name" autocomplete="Task Name"
                                    aria-label="Task Name" name="task_title" @focus="resetError" type="text"
                                    v-model="task.task_title" required>
                                </CInput>
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol col="6">
                                <CSelect label="Reporter User" :options="options" :value.sync="task.reporter_user_id"
                                    placeholder="Please select" name="reporter_user_id" />
                            </CCol>
                            <CCol col="6">
                                <CSelect label="Assinee User" :options="options" :value.sync="task.assignee_user_id"
                                    placeholder="Please select" name="assignee_user_id" />
                            </CCol>
                        </CRow>




                        <CTextarea autocomplete="Task Description" aria-label="Task Description" name="description"
                            v-model="task.description" label="Task Description" placeholder="Enter Task Description"
                            @focus="resetError" required rows="6" />
                    </CCardBody>
                    <CCardFooter>
                        <CRow>
                            <div class="alert alert-danger col-12" role="alert" v-if="newTaskError !== ''">
                                {{ newTaskError }}</div>
                            <CCol col="6" class="text-left">
                                <CButton color="dark" class="px-4" type="button" @click="$router.go(-1)"> Back</CButton>
                            </CCol>
                            <CCol col="6" class="text-right">
                                <CButton color="primary" class="px-4" :disabled="loading" type="submit">
                                    <CSpinner v-if="loading" color="light" size="sm" /> Submit</CButton>
                            </CCol>
                        </CRow>
                    </CCardFooter>
                </CForm>
            </CCard>
        </CCol>
    </CRow>
</template>

<script>
    import {
        mapGetters
    } from "vuex"
    export default {
        name: 'NewTask',
        computed: {
            ...mapGetters({
                loading: 'tasks/loading',
                newTaskError: 'tasks/newTaskError',
                users: 'users/users',
            }),
        },
        data() {
            return {
                task: {
                    task_title: null,
                    description: null,
                    project_id: parseInt(this.$route.query.id),
                    reporter_user_id: 1,
                    assignee_user_id: 1,
                },
                options: [],
            };
        },
        methods: {
            async submit(event) {
                await this.$store.dispatch('tasks/submit', this.task);
            },
            async resetError(event) {
                await this.$store.dispatch('tasks/resetError')
            },
            fetchUser() {
                for (let i = 0; i < this.users.length; i++) {
                    const user = this.users[i]
                    this.options.push({
                        value: parseInt(user.id),
                        label: user.name
                    })
                }
            }
        },
        mounted() {
            if (this.users === {}||this.users.length===0||this.users.length===undefined) {
                this.$store.dispatch('users/fetchAll').then(() => {
                    this.fetchUser()
                })
            }else{
                 this.fetchUser()
            }

        },
    }
</script>