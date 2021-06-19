import service from '@/store/services/scheduletype-service';

const state = {
  scheduletype: null,
  list: {},
};

const mutations = {
  SET_RESOURCE: (state, scheduletype) => {
    state.scheduletype = scheduletype;
  },
  SET_LIST: (state, list) => {
    state.list = list;
  },
};

const actions = {
  index({ commit, dispatch }, params) {
    return service.get(params)
      .then((scheduletype) => {
        commit('SET_RESOURCE', scheduletype.list);
      });
  },
  show({ commit, dispatch }, params) {
    return service.show(params)
      .then((scheduletype) => {
        commit('SET_RESOURCE', scheduletype.list);
      });
  },

  update({ commit, dispatch }, params) {
    return service.update(params, params.id)
      .then((scheduletype) => {
        console.log(scheduletype);
      });
  },
  store({ commit, dispatch }, params) {
    return service.store(params)
      .then((scheduletype) => {
        console.log(scheduletype)
      });
  },
};

const getters = {
  list: state => state.list,
  index: state => state.scheduletype,
  show: state => state.scheduletype,
};

const scheduletype = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default scheduletype;