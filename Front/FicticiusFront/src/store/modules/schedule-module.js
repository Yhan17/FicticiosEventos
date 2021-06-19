import service from '@/store/services/schedule-service';

const state = {
  schedule: null,
  list: {},
};

const mutations = {
  SET_RESOURCE: (state, schedule) => {
    state.schedule = schedule;
  },
  SET_LIST: (state, list) => {
    state.list = list;
  },
};

const actions = {
  index({ commit, dispatch }, params) {
    return service.get(params)
      .then((schedule) => {
        commit('SET_RESOURCE', schedule.list);
      });
  },
  show({ commit, dispatch }, params) {
    return service.show(params)
      .then((schedule) => {
        commit('SET_RESOURCE', schedule.list);
      });
  },

  update({ commit, dispatch }, params) {
    return service.update(params, params.id)
      .then((schedule) => {
        console.log(schedule);
      });
  },
  store({ commit, dispatch }, params) {
    return service.store(params)
      .then((schedule) => {
        console.log(schedule)
      });
  },
};

const getters = {
  list: state => state.list,
  index: state => state.schedule,
  show: state => state.schedule,
};

const schedule = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

export default schedule;