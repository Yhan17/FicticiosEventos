import service from '@/store/services/customers-service';

const state = {
  client: null,
  list: {},
};

const mutations = {
  SET_RESOURCE: (state, client) => {
    state.client = client;
  },
  SET_LIST: (state, list) => {
    state.list = list;
  },
};

const actions = {
  index({commit, dispatch}, params) {
    return service.get(params)
      .then((client) => {
        commit('SET_RESOURCE', client.list);
      });
  },
  show({commit, dispatch}, params) {
    return service.show(params)
      .then((client) => {
        commit('SET_RESOURCE', client.list);
      });
  },

  update({commit, dispatch}, params) {
    return service.update(params, params.id)
      .then((client) => {
       console.log(client);
      });
  },
  store({commit, dispatch}, params) {
    return service.store(params)
      .then((client) => {
        console.log(client)
      });
  },
};

const getters = {
  list: state => state.list,
  index: state => state.client,
  show: state => state.client,
};

const customers = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default customers;