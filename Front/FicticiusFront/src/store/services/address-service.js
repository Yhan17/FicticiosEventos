import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;
const token = localStorage.getItem("vue-authenticate.vueauth_access_token");

if (token) {
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common['authorization'];
}

function get() {
  return axios.get(`${url}/Addresses`)
    .then(response => {
      return {
        list: response.data,
        meta: response.data.meta
      };
    });
}

function show(id) {
  return axios.get(`${url}/Addresses/${id}`)
    .then(response => {
      return {
        list: response.data,
        meta: response.data.meta
      };
    });
}

function update(address, id) {

  return axios.put(`${url}/Addresses/${id}`, address)
    .then(response => {
      return response.data;
    });
}
function store(address) {

  return axios.post(`${url}/Addresses`, address)
    .then(response => {
      return response.data;
    });
}

export default {
  get,
  update,
  store,
  show
};