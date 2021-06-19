import Vue from 'vue';
import Vuex from 'vuex';

import auth from "./modules/auth";
import alerts from "./modules/alerts-module";
import profile from "./modules/profile-module";
import users from "./modules/users-module";
import customers from "./modules/customers-module";
import address from "./modules/address-module";
import scheduletype from "./modules/scheduletype-module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    alerts,
    profile,
    customers,
    address,
    scheduletype,
    users
  }
});
