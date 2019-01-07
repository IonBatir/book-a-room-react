import axios from "axios";

const api = "https://book-a-room.ionbatir.com/api/";

export const getHotels = () =>
  axios
    .get(api + "hotel")
    .then(response => Promise.resolve(response.data))
    .catch(error => Promise.reject(error));
