<template>
    <div>
        <CRow>
            <CCol col="12" sm="12" md="12" xl="12">
                <div class="d-flex align-items-center justify-content-between border py-2 px-4 mb-2">
                    <h5 class="mb-0">Comments</h5>

                    <CButton color="dark" variant="ghost" @click="$router.push({name:'New Comment',query:{task:task.branch_name}})">
                        <CIcon name="cil-plus" />

                    </CButton>

                   
                </div>
               
                <div class="px-4">
                    <div v-for="taskComment in taskComments" v-bind:key="taskComment.id" class=" py-3">
                        <div class="d-flex justify-content-start align-items-center mb-1 w-100" style="gap: 0.5rem;">
                            <Avatar :user="taskComment.user" :size="28"></Avatar>
                            <div>
                                <div class="text-left font-weight-bold" style="line-height: 1;">
                                    {{ taskComment.user.name + ' ' }}
                                </div>
                                <div style="line-height: 1; font-size: small;">
                                    {{ taskComment.created_at | moment }}
                                </div>
                            </div>


                        </div>
                        <div class="d-flex px-3 pt-2 border rounded shadow">
                            <span v-html="taskComment.comment" />
                        </div>

                    </div>
                </div>
            </CCol>
           
        </CRow>


    </div>
</template>

<script>
import {
    mapGetters
} from "vuex"

import moment from 'moment'
export default {
    name: 'TaskComment',
   
    props: {
        task: {
            type:Object,
            default: ()=>{}
        }
    },
    computed: {
        ...mapGetters({
            user: 'users/user',
            loading: 'taskComments/loading',
            taskComments: 'taskComments/taskComments',
         
        }),
    },
    filters: {
        moment: function (date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        }
    },
    async beforeMount() {
        this.$store.dispatch('taskComments/setNewTaskCommentsLoading', true)
        await this.$store.dispatch('users/fetchUserDetails')
        await this.$store.dispatch('taskComments/fetch', { task_id: this.task.id })
        this.$store.dispatch('taskComments/setNewTaskCommentsLoading', false)
    },
    beforeUnmount() {
        this.$store.dispatch('taskComments/setTaskComments', {})
    },


}
</script>