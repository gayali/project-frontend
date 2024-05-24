<template>
    <div>
        <CCard>

            <CForm @submit.prevent="addComment">

                <CCardHeader>
                    <CRow>
                        <CCol col="12">
                            <div class="d-flex align-items-center">
                                <CButton size="sm" variant="outline" color="dark" type="button" @click="$router.go(-1)"
                                    v-c-tooltip.hover="'Back'" class="mr-2">
                                    <CIcon name="cilArrowLeft" />
                                </CButton>
                                <CCardTitle class="mb-0">New Comment</CCardTitle>
                            </div>
                        </CCol>
                    </CRow>
                </CCardHeader>

                <CCardBody>
                    <div class="alert alert-danger col-12" role="alert" v-if="addTaskCommentError !== ''">
                        {{ addTaskCommentError }}</div>
                    <vue-editor v-model="comment" :editorToolbar="customToolbar" @focus="resetError" required></vue-editor>
                </CCardBody>
                <CCardFooter>
                    <CButton color="primary" class="col-4 col-md-1 col-lg-1 mb-3 float-right"
                        :disabled="newTaskCommentsLoading" type="submit">
                        <CSpinner v-if="newTaskCommentsLoading" color="light" size="sm" /> Add
                    </CButton>
                </CCardFooter>



            </CForm>

        </CCard>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
export default {
    name: "NewSprint",
    components: {
        VueEditor
    },
    data() {
        return {
            taskBranchName: "",
            customToolbar: [
                ["bold", "italic", "underline"],
                [{
                    list: "ordered"
                }, {
                    list: "bullet"
                }],
                ["code-block"]
            ],
            comment: ""
        };
    },
    computed: {
        ...mapGetters({
            user: 'users/user',
            error: "sprints/newSprintError",
            loading: "sprints/loading",
            projects: "projects/projects",
            isAdmin: "users/isAdmin",
            newTaskCommentsLoading: 'taskComments/newTaskCommentsLoading',
            addTaskCommentError: 'taskComments/newTaskCommentsError'
        }),
    },
    beforeMount() {
        if (this.$route.query.task) {
            this.taskBranchName = this.$route.query.task;
        }

    },
    methods: {
        async addComment() {
            if (this.comment) {
                let isSubmit = confirm("Are you sure to add comment ?")
                if (isSubmit) {
                    await this.$store.dispatch('taskComments/submit', {
                        comment: this.comment,
                        task_branch_name: this.taskBranchName,
                        commented_by_user_id: this.user.id
                    })
                    if (this.addTaskCommentError === '') this.comment = null
                }
            }

        },

        async resetError(event) {
            await this.$store.dispatch('taskComments/resetError')
        },
    }
};
</script>