<template>
    <div>
        <CCard>
            <CForm @submit.prevent="submit">
                <CCardHeader>
                    <CButton variant="outline" color="dark" type="button" @click="$router.go(-1)"
                        v-c-tooltip.hover="'Back'">
                        <CIcon name="cilArrowLeft" />
                    </CButton>

                    <div class="alert alert-danger col-6 mx-auto" role="alert" v-if="editTaskError !== ''">
                        {{ editTaskError }}</div>
                    <CButton color="primary" class="col-4 col-md-1 col-lg-1 float-right" :disabled="loading"
                        type="submit">
                        <CSpinner v-if="loading" color="light" size="sm" /> Edit</CButton>
                </CCardHeader>
                <CCardBody>

                    <CRow>

                        <CCol col="12" sm="12" md="4" xl="4">
                            <CInput placeholder="Enter Task Name" label="Task Name" autocomplete="Task Name"
                                aria-label="Task Name" name="task_title" @focus="resetError" type="text"
                                v-model="task.task_title" required></CInput>

                            <CSelect label="Status" :options="statusOptions" :value.sync="task.status"
                                placeholder="Please select" name="select_status" @focus="resetError" />
                            <CSelect label="Reporter User" :options="options" :value.sync="task.reporter_user_id"
                                placeholder="Please select" name="reporter_user_id" readonly />
                            <CSelect label="Assinee User" @focus="resetError" :options="options"
                                :value.sync="task.assignee_user_id" placeholder="Please select"
                                name="assignee_user_id" />
                        </CCol>
                        <CCol col="12" sm="12" md="8" xl="8">
                            <h5>Branch Name : <CBadge color="secondary" shape="pill">{{task.branch_name}}</CBadge>
                            </h5>

                            <div class="mb-2">Task Description</div>
                            <vue-editor v-model="task.description" :editorToolbar="customToolbar" required></vue-editor>


                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol col="6">
                            <CInput placeholder="Enter Start Date" label="Start Date (if any)" autocomplete="Start Date"
                                aria-label="Start Date" name="start_date" @focus="resetError" type="date"
                                v-model="task.start_date">
                            </CInput>
                        </CCol>
                        <CCol col="6">
                            <CInput placeholder="Enter End Date" label="End Date" autocomplete="End Date"
                                aria-label="End Date" name="end_date" @focus="resetError" type="date"
                                :disabled="userCantEdit" v-model="task.end_date">
                            </CInput>
                        </CCol>
                    </CRow>
                </CCardBody>

            </CForm>
            <CCardFooter>
                <CRow>

                    <CCol col="12" class="text-right">
                        <CButton color="danger" class="px-4 btn-sm" type="button" :disabled="loading"
                            @click="deleteTask">
                            <CSpinner v-if="loading" color="light" size="sm" />
                            Delete Task</CButton>
                    </CCol>
                </CRow>
            </CCardFooter>
        </CCard>
        <TaskComment :taskId="task.id"></TaskComment>
    </div>

</template>

<script>
    import * as Roles from "@/enums/roles"
    import {
        VueEditor
    } from "vue2-editor"
    import {
        mapGetters
    } from "vuex"
    import {
        allTypes
    } from "../../../enums/taskTypes"
    import TaskComment from './TaskComment'
    export default {
        name: 'TaskDetails',
        components: {
            VueEditor,
            TaskComment
        },
        computed: {
            ...mapGetters({
                loading: 'tasks/loading',
                editTaskError: 'tasks/editTaskError',
                users: 'users/users',
                user: 'users/user'
            }),
            userCantEdit() {

                if (this.user.roles[0].name === Roles.ADMIN) return false
                return true
            }
        },
        data() {
            return {
                task: JSON.parse(this.$route.query.task),
                statusOptions: allTypes,
                options: [],
                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{
                        list: "ordered"
                    }, {
                        list: "bullet"
                    }],
                    ["code-block"]
                ]

            }
        },
        methods: {
            fetchUser() {
                for (let i = 0; i < this.users.length; i++) {
                    const user = this.users[i]
                    this.options.push({
                        value: parseInt(user.id),
                        label: user.name
                    })
                }
            },
            async submit() {
                await this.$store.dispatch('tasks/edit', this.task)

            },
            async resetError() {
                await this.$store.dispatch('tasks/resetError')
            },
            async deleteTask() {
                let yesDelete = confirm(
                    'This will delete task records and all comments regarding. \nAre you sure to delete ?'
                )
                if (yesDelete) await this.$store.dispatch('tasks/delete', {
                    id: this.task.id
                })
            }
        },
        async beforeMount() {
            let users = Object.entries(this.users)
            if (users.length === 0) await this.$store.dispatch('users/fetchAll')
            this.fetchUser()
            await this.$store.dispatch('users/fetchUserDetails')

        },
        beforeUnmount() {
            this.task = {}
        },
    }
</script>