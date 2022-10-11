import axios from 'axios';
import dayjs from 'dayjs';

import { BACKEND_URL } from '../config';

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
        reject(error);
      });
  });
}

export function formatDate(date) {
  return dayjs(date).locale('sl').format('D. MMMM YYYY, HH:mm');
}
