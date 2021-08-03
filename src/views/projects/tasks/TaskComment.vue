<template>
    <div>
        <CRow>
            <CCol col="12" sm="12" md="12" xl="12">
                <CCard>
                    <CCardHeader>
                        <strong> Comments</strong>

                    </CCardHeader>
                    <CCardBody class="text-center">
                        <CSpinner color="primary" v-if="loading" size="lg" />
                        <CListGroup>
                            <CListGroupItem v-for="taskComment in taskComments" v-bind:key="taskComment.id" tag="button"
                                class="d-flex justify-content-between align-items-center"
                                v-c-tooltip.hover="'Click to Edit'">
                               
                                <span v-html="taskComment.comment"></span>
                                <CBadge color="primary" shape="pill">{{'by '+taskComment.user.name + ' on '}} {{taskComment.created_at|moment }} </CBadge>

                            </CListGroupItem>
                        </CListGroup>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol col="12" sm="12" md="12" xl="12">
                <CCard>
                    <CForm @submit.prevent="submit">
                        <CCardHeader class="pb-4">
                            <strong>Add Comment</strong>
                            <CButton color="primary" class="col-4 col-md-1 col-lg-1 mb-1 float-right" :disabled="newTaskCommentsLoading"
                                type="submit">
                                <CSpinner v-if="newTaskCommentsLoading" color="light" size="sm" /> Add</CButton>
                        </CCardHeader>

                        <CCardBody>
                            <div class="alert alert-danger col-12" role="alert" v-if="addTaskCommentError !== ''">
                                {{ addTaskCommentError }}</div>
                            <vue-editor v-model="comment" :editorToolbar="customToolbar"  @focus="resetError" required ></vue-editor>
                        </CCardBody>

                    </CForm>
                </CCard>
            </CCol>
        </CRow>


    </div>

</template>

<script>
    import {
        mapGetters
    } from "vuex"
    import {
        VueEditor
    } from "vue2-editor"
        import moment from 'moment'
    export default {
        name: 'TaskComment',
        components: {
            VueEditor,
        },
        props: {
            taskId: {
                default: null
            }
        },
        computed: {
            ...mapGetters({
                user: 'users/user',
                loading: 'taskComments/loading',
                taskComments: 'taskComments/taskComments',
                newTaskCommentsLoading: 'taskComments/newTaskCommentsLoading',
                addTaskCommentError: 'taskComments/newTaskCommentsError'
            }),
        },
         filters: {
            moment: function (date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            }
        },
        data() {
            return {
                customToolbar: [
                    ["bold", "italic", "underline"],
                    [{
                        list: "ordered"
                    }, {
                        list: "bullet"
                    }],
                    ["code-block"]
                ],
                comment: null,

            }
        },
        methods: {
            async submit(event) {
                let isSubmit = confirm("Are you sure to add comment ?")
                if (isSubmit) {


                    await this.$store.dispatch('taskComments/submit', {
                        comment: this.comment,
                        task_id: this.taskId,
                        commented_by_user_id: this.user.id
                    })
                    if (this.addTaskCommentError === '') this.comment = null
                }
            },
             async resetError(event) {
                await this.$store.dispatch('taskComments/resetError')
            },
        },
        async beforeMount() {
            this.$store.dispatch('taskComments/setNewTaskCommentsLoading', true)
            await this.$store.dispatch('users/fetchUserDetails')
            await this.$store.dispatch('taskComments/fetch',{task_id:this.taskId})
            this.$store.dispatch('taskComments/setNewTaskCommentsLoading', false)
        },
        beforeUnmount() {
            this.$store.dispatch('taskComments/setTaskComments', {})
        },
        
        
    }
</script>