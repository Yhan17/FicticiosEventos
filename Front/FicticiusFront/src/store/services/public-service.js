import axios from 'axios';

const url = process.env.VUE_APP_API_BASE_URL;
const token = localStorage.getItem("vue-authenticate.vueauth_access_token");

if (token) {
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
} else {
  delete axios.defaults.headers.common['authorization'];
}

function store(clients) {

  return axios.post(`${url}/Publics/api/Publics/PostMultipleCustomer/execute`, clients)
    .then(response => {
      return response.data;
    });
}
function storeImages(images) {

  return axios.post(`${url}/Publics/api/Publics/PostMultipleImages/execute`, images)
    .then(response => {
      return response.data;
    });
}

export default {
  store,
  storeImages
};