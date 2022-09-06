import axios from 'axios';

import { BACKEND_URL } from '../config/env';

export function request(
  url,
  method = 'GET',
  data = null,
  headers = null,
  api_url = BACKEND_URL
) {
  return new Promise((resolve, reject) => {
    axios({
      url: api_url + url,
      method: method,
      data: data,
      headers: headers,
      withCredentials: true,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

export function formatDate(date) {
  const [year, month, day] = date.split('-').map(part => Number(part));
  const newDate = new Date(year, month - 1, day);
  const newDay = newDate.toLocaleDateString('sl-SL', { weekday: 'long' });
  const newMonth = newDate.toLocaleString('sl-SL', { month: 'long' });
  return `${day}. ${newMonth} ${year}, ${newDay}`;
}
