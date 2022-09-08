import { useEffect, useState } from 'react';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

import MyGroupAlert from '../../components/groups/my_group/MyGroupAlert';
import InfoCard from '../../components/groups/my_group/InfoCard';

const MyGroup = ({ user }) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [minGroupMembers, setMinGroupMembers] = useState(null);
  const [maxGroupMembers, setMaxGroupMembers] = useState(null);

  useEffect(() => {
    setShowLoadingSpinner(true);
    request(`/events/${user.group.event_id}`)
      .then(data => {
        setShowLoadingSpinner(false);

        setMaxGroupMembers(+data.max_group_members);
        setMinGroupMembers(+data.min_group_members);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju dogodka',
          text: 'Prišlo je do napake pri pridobivanju dogodka. Poskusite znova.',
        });
      });
  }, [user, setShowLoadingSpinner, setDialog]);

  return (
    <>
      <MyGroupAlert
        user={user}
        maxGroupMembers={maxGroupMembers}
        minGroupMembers={minGroupMembers}
      />
      <InfoCard user={user} />
    </>
  );
};

export default MyGroup;
