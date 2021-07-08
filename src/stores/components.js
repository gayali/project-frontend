export default {
  state: {
    modalVisibility: false,
  },
  getters: {
    modalVisibility: (state) => state.modalVisibility
  },
  mutations: {
    SET_MODAL_VISIBILITY(state, boolean) {
      state.modalVisibility = boolean
    },
  },
  actions: {
    setModalVisibility({ commit, dispatch },boolean) {
      commit('SET_MODAL_VISIBILITY', boolean)
    },
  },
  namespaced: true
}