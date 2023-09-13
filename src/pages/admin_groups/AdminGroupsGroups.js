import { useState, useEffect, useCallback } from 'react';

import { useUIContext } from '../../context/UIContext';

import GroupsList from '../../components/admin_groups/groups/GroupsList';

import { request } from '../../utils/functions';

const AdminGroupsGroups = ({ eventId }) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [groups, setGroups] = useState([]);

  const getGroups = useCallback(() => {
    if (!eventId) return;

    setShowLoadingSpinner(true);
    request(`/events/${eventId}/groups`)
      .then(response => {
        setShowLoadingSpinner(false);
        setGroups(response);
      })
      .catch(error => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju skupin',
          text: 'Prišlo je do napake pri pridobivanju skupin. Poskusite znova.',
        });
      });
  }, [eventId, setShowLoadingSpinner, setDialog]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return <GroupsList groups={groups} getGroups={getGroups} />;
};

export default AdminGroupsGroups;
