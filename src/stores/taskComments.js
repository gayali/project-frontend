import {
    RepositoryFactory
} from '@/api/repositoryFactory'
const repository = RepositoryFactory.get('taskComments')

export default {
    state: {
        taskComments: {},
        loading: false,
        newTaskCommentsLoading: false,
        taskCommentsError: '',
        newTaskCommentsError: '',
        editTaskCommentsError: '',
    },
    getters: {
        taskComments: (state) => state.taskComments,
        taskCommentsError: (state) => state.taskCommentsError,
        loading: (state) => state.loading,
        newTaskCommentsLoading: (state) => state.newTaskCommentsLoading,
        editTaskCommentsError: (state) => state.editTaskCommentsError,
        newTaskCommentsError: (state) => state.newTaskCommentsError,
    },
    mutations: {
        SET_TASK_COMMENTS(state, payload) {
            state.taskComments = payload
        },
        SET_TASK_COMMENTS_ERROR(state, error) {
            state.taskCommentsError = error
        },
        SET_LOADING(state, boolean) {
            state.loading = boolean
        },
        SET_NEW_TASK_COMMENTS_LOADING(state, boolean) {
            state.newTaskCommentsLoading = boolean
        },
        SET_EDIT_TASK_COMMENTS_ERROR(state, payload) {
            state.editTaskCommentsError = payload
        },
        SET_NEW_TASK_COMMENTS_ERROR(state, error) {
            state.newTaskCommentsError = error
        },
    },
    actions: {
        async fetch({
            commit,
            state,
            dispatch
        },payload) {
            try {
                commit('SET_LOADING', true)
                const response = await repository.getTaskComments(payload)
                if (response.status === 200 || response.status === 201) {
                    commit('SET_TASK_COMMENTS', response.data.taskComments)
                } else {
                    commit('SET_TASK_COMMENTS_ERROR', response.data.message)
                }
                commit('SET_LOADING', false)
            } catch (e) {
                console.log(e)
                console.log(e.response)
                commit('SET_TASK_COMMENTS_ERROR', e.response.data.message)
                commit('SET_LOADING', false)
            }
        },

        setTaskCommentsError({
            commit
        }, payload) {
            commit('SET_TASK_COMMENTS_ERROR', payload)
        },
        setNewTaskCommentsError({
            commit
        }, payload) {
            commit('SET_NEW_TASK_COMMENTS_ERROR', payload)
        },
        setEditTaskCommentsError({
            commit
        }, payload) {
            commit('SET_EDIT_TASK_COMMENTS_ERROR', payload)
        },
        setNewTaskCommentsLoading({
            commit
        }, payload) {
            commit('SET_NEW_TASK_COMMENTS_LOADING', payload)
        },
        setLoading({
            commit
        }, boolean) {
            commit('SET_LOADING', boolean)
        },

        async submit({
            commit,
            state,
            dispatch
        }, payload) {
            try {
                commit('SET_NEW_TASK_COMMENTS_LOADING', true)
                const response = await repository.newTaskComment(payload)
                if (response.status === 200 || response.status === 201) {
                    dispatch('fetch',{task_id:payload.task_id})

                } else {
                    commit('SET_NEW_TASK_COMMENTS_ERROR', response.data.message)
                }
                commit('SET_NEW_TASK_COMMENTS_LOADING', false)
            } catch (e) {
                console.log(e)
                console.log(e.response)
                commit('SET_NEW_TASK_COMMENTS_ERROR', e.response.data.message)
                commit('SET_NEW_TASK_COMMENTS_LOADING', false)
            }
        },
        async resetError({
            commit
        }) {
            commit('SET_NEW_TASK_COMMENTS_ERROR', '')
            commit('SET_EDIT_TASK_COMMENTS_ERROR', '')
        },
    },
    namespaced: true
}