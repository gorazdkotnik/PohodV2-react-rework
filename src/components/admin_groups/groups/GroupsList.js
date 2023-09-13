import React from 'react';
import { useUIContext } from '../../../context/UIContext';

import Typography from '@mui/material/Typography';

import GroupItem from './GroupItem';

import { request } from '../../../utils/functions';

const GroupsList = ({ groups, getGroups }) => {
  const { setDialog } = useUIContext();

  const [event, setEvent] = React.useState(null);

  React.useEffect(() => {
    if (!groups || groups.length === 0) return;

    request(`/events/${groups[0]?.event_id}`)
      .then(data => {
        setEvent(data);
      })
      .catch(error => {
        setDialog({
          title: 'Napaka pri pridobivanju podatkov o dogodku',
          text: 'Prišlo je do napake pri pridobivanju podatkov o dogodku. Poskusite znova.',
        });
      });
  }, [groups, setDialog, setEvent]);

  return (
    <>
      {groups &&
        groups.length > 0 &&
        groups.map(group => (
          <GroupItem
            key={group.group_id}
            group={group}
            event={event}
            getGroups={getGroups}
          />
        ))}
      {groups && groups.length === 0 && (
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ mt: 2, fontWeight: 'light' }}
        >
          Ni skupin za prikaz!
        </Typography>
      )}
    </>
  );
};

export default GroupsList;
