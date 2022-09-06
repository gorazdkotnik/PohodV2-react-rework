import { request } from '../utils/functions';

import { useState, useEffect } from 'react';

const useRequest = (url, method, body, headers) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    request(url, method, body, headers)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        console.log('err', err?.response?.data);
      });
  }, [url, method, body, headers]);

  const reload = () => {
    setLoading(true);
    request(url, method, body, headers)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  };

  return { data, error, loading, reload };
};

export default useRequest;
