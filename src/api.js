import axios from "axios";

const url = "https://book-a-room.ionbatir.com/api/";

export const getHotels = () =>
  axios
    .get(url + "hotel")
    .then(response => Promise.resolve(response.data))
    .catch(error => Promise.reject(error));

export const deleteHotel = id =>
  axios
    .delete(url + "hotel", { params: { id } })
    .then(response => Promise.resolve(response.data))
    .catch(error => Promise.reject(error));
