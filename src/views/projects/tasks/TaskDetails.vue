<template>
    <div>
        <CForm @submit.prevent="submit">
            <CRow>

                <CCol col="12" sm="12" md="8" xl="8">
                    <CInput label="Task Title" autocomplete="Task Title" aria-label="Task Title" name="task_tile"
                        type="text" readonly v-model="task.task_title">
                    </CInput>

                    <div class="mb-2">Task Description</div>
                    <vue-editor v-model="task.description" :editorToolbar="customToolbar" required></vue-editor>
                </CCol>
                <CCol col="12" sm="12" md="4" xl="4">
                    <CInput label="Branch Name" autocomplete="Branch Name" aria-label="Branch Name" name="branch_name"
                        type="text" readonly v-model="task.branch_name">
                    </CInput>
                    <CSelect label="Status" :options="statusOptions" :value.sync="task.status" placeholder="Please select"
                        name="select_status" @focus="resetError" />
                    <CSelect label="Reporter User" :options="options" :value.sync="task.reporter_user_id"
                        placeholder="Please select" name="reporter_user_id" readonly />
                    <CSelect label="Assinee User" @focus="resetError" :options="options" :value.sync="task.assignee_user_id"
                        placeholder="Please select" name="assignee_user_id" />
                </CCol>
            </CRow>
            <CRow class="border-top pt-3">
                <div class="alert alert-danger col-12" role="alert" v-if="editTaskError !== ''">
                    {{ editTaskError }}</div>
                <CCol col="12" sm="12" md="12" xl="12" class="text-right">
                    <CButton color="primary" class="px-4" :disabled="loading" type="submit">
                        <CSpinner v-if="loading" color="light" size="sm" /> Submit</CButton>
                </CCol>
            </CRow>
        </CForm>
    </div>

</template>

<script>
    import {
        VueEditor
    } from "vue2-editor"
    import {
        mapGetters
    } from "vuex"
    import {
        allTypes
    } from "../../../enums/taskTypes"
    export default {
        name: 'TaskDetails',

        props: {
            task: {
                default: null
            }
        },
        components: {
            VueEditor
        },
        computed: {
            ...mapGetters({
                loading: 'tasks/loading',
                editTaskError: 'tasks/editTaskError',
                users: 'users/users',
            }),
        },
        data() {
            return {
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
            async submit(event) {
                await this.$store.dispatch('tasks/edit', this.task)
            },
            async resetError(event) {
                await this.$store.dispatch('tasks/resetError')
            },
        },
        async beforeMount() {
            let users=Object.entries(this.users)
            if(users.length===0) await this.$store.dispatch('users/fetchAll')
            this.fetchUser()
        },
        beforeUnmount() {
            this.task = {}
        },
    }
</script>