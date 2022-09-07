import { useEffect, useState } from 'react';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

import Map from '../ui/Map';

const UserHome = ({ user }) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [points, setPoints] = useState([]);

  useEffect(() => {
    if (user.group) {
      setShowLoadingSpinner(true);
      request('/points/unlocked')
        .then(res => {
          setShowLoadingSpinner(false);

          const uniquePoints = res.filter(
            (point, index) =>
              res.findIndex(
                p =>
                  p.point_id === point.point_id && p.group_id === point.group_id
              ) === index
          );

          setPoints(uniquePoints);
        })
        .catch(err => {
          setShowLoadingSpinner(false);
        });
    }
  }, [user.group, setShowLoadingSpinner, setDialog]);

  return <Map points={points} />;
};

export default UserHome;
