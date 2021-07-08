export default {
    state: {
        sidebarShow: 'responsive',
        sidebarMinimize: false,
        sidebarData: []
    },
    getters: {
        sidebarShow: (state) => state.sidebarShow,
        sidebarMinimize: (state) => state.sidebarMinimize,
        sidebarData: (state) => state.sidebarData
    },
    mutations: {
        TOGGLE_SIDEBAR_DESKTOP(state) {
            const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
            state.sidebarShow = sidebarOpened ? false : 'responsive'
        },
        TOGGLE_SIDEBAR_MOBILE(state) {
            const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
            state.sidebarShow = sidebarClosed ? true : 'responsive'
        },
        SET_SIDEBAR_SHOW(state, payload) {
            state.sidebarShow = payload
        },
        SET_SIDEBAR_MINIMIZE(state, payload) {
            state.sidebarMinimize = payload
        },
        SET_SIDEBAR_DATA(state, payload) {
            state.sidebarData = payload
        }
    },
    actions: {
        setSidebarShow({
            commit,
            dispatch
        }, payload) {
            commit('SET_SIDEBAR_SHOW', payload)
        },
        setSidebarMinimize({
            commit,
            dispatch
        }, payload) {
            commit('SET_SIDEBAR_MINIMIZE', payload)
        },
        setToggleSidebarMobile({
            commit,
            dispatch
        }, payload) {
            commit('TOGGLE_SIDEBAR_MOBILE', payload)
        },
        setToggleSidebarDesktop({
            commit,
            dispatch
        }, payload) {
            commit('TOGGLE_SIDEBAR_DESKTOP', payload)
        },
        setSidebarData({ state,commit, dispatch }, payload) {
           state.sidebarData=payload
        },
    },
    namespaced: true
}