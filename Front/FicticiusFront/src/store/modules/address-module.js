import service from '@/store/services/address-service';

const state = {
  address: null,
  list: {},
};

const mutations = {
  SET_RESOURCE: (state, address) => {
    state.address = address;
  },
  SET_LIST: (state, list) => {
    state.list = list;
  },
};

const actions = {
  index({ commit, dispatch }, params) {
    return service.get(params)
      .then((address) => {
        commit('SET_RESOURCE', address.list);
      });
  },
  show({ commit, dispatch }, params) {
    return service.show(params)
      .then((address) => {
        commit('SET_RESOURCE', address.list);
      });
  },

  update({ commit, dispatch }, params) {
    return service.update(params, params.id)
      .then((address) => {
        console.log(address);
      });
  },
  store({ commit, dispatch }, params) {
    return service.store(params)
      .then((address) => {
        console.log(address)
      });
  },
};

const getters = {
  list: state => state.list,
  index: state => state.address,
  show: state => state.address,
};

const address = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default address;