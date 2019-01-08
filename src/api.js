import axios from "axios";

const url = "https://book-a-room.ionbatir.com/api/";

export const fetchItems = endpoint =>
  axios
    .get(url + endpoint)
    .then(response => Promise.resolve(response.data))
    .catch(error => Promise.reject(error));

export const updateItem = (endpoint, data) =>
  axios
    .put(url + endpoint, data)
    .then(response => Promise.resolve(response.data))
    .catch(error => Promise.reject(error));

export const addItem = (endpoint, data) =>
  axios
    .post(url + endpoint, data)
    .then(response => Promise.resolve(response.data))
    .catch(error => Promise.reject(error));

export const deleteItem = (endpoint, id) =>
  axios
    .delete(url + endpoint, { params: { id } })
    .then(response => Promise.resolve(response.data))
    .catch(error => Promise.reject(error));
