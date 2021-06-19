import service from '@/store/services/public-service';

const state = {
  publicService: null,
  list: {},
};

const mutations = {
  SET_RESOURCE: (state, publicService) => {
    state.publicService = publicService;
  },
  SET_LIST: (state, list) => {
    state.list = list;
  },
};

const actions = {

  store({ commit, dispatch }, params) {
    return service.store(params)
      .then((publicService) => {
        console.log(publicService)
      });
  },
  storeImages({ commit, dispatch }, params) {
    return service.storeImages(params)
      .then((publicService) => {
        console.log(publicService)
      });
  },
};

const getters = {
  index: state => state.publicService,
};

const publicService = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default publicService;