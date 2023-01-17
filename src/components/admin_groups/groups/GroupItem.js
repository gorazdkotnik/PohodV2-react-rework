import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUIContext } from '../../../context/UIContext';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import GroupIcon from '@mui/icons-material/Group';

import { request } from '../../../utils/functions';

const GroupItem = ({ group, event }) => {
  const { setDialog } = useUIContext();

  const [numberOfStudentsInGroup, setNumberOfStudentsInGroup] =
    React.useState(0);
  const [groupLeader, setGroupLeader] = React.useState(null);

  React.useEffect(() => {
    request(`/groups/${group.group_id}`)
      .then(data => {
        setNumberOfStudentsInGroup(data?.members?.length || 0);

        if (data?.members?.length > 0) {
          const leader = data.members.find(
            member => member.user_id.toString() === group.leader_id.toString()
          );
          setGroupLeader(leader);
        }
      })
      .catch(error => {
        setDialog({
          title: 'Napaka pri pridobivanju števila učencev v skupini',
          text: 'Prišlo je do napake pri pridobivanju števila učencev v skupini. Poskusite znova.',
        });
      });
  }, [group, setDialog, setNumberOfStudentsInGroup]);

  return (
    <Card sx={{ my: 4 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ p: 1 }}
          backgroundColor="secondary"
        >
          {group.name}
        </Typography>

        {/* group leader */}
        <Typography sx={{ p: 1 }} variant="p" gutterBottom>
          <Typography variant="span" sx={{ fontWeight: 'bold' }}>
            Vodja skupine:
          </Typography>{' '}
          {groupLeader?.first_name} {groupLeader?.last_name}
        </Typography>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          <Tooltip title="Oglejte si podrobnosti razreda">
            <Button
              variant="outlined"
              component={NavLink}
              to={`/admin-groups/groups/${group.group_id}`}
            >
              Oglej si skupino
            </Button>
          </Tooltip>

          {/* number of members */}
          <Tooltip title="Število dijakov v skupini">
            <Button variant="contained">
              <GroupIcon />
              {numberOfStudentsInGroup}
            </Button>
          </Tooltip>

          {/* too much members */}
          {event && +numberOfStudentsInGroup > +event.max_group_members && (
            <Tooltip title="Skupina ima preveč dijakov">
              <Button variant="contained" color="error">
                Preveč dijakov ({numberOfStudentsInGroup})
              </Button>
            </Tooltip>
          )}

          {/* too few members */}
          {event && +numberOfStudentsInGroup < +event.min_group_members && (
            <Tooltip title="Skupina ima premalo dijakov">
              <Button variant="contained" color="error">
                Premalo dijakov ({numberOfStudentsInGroup})
              </Button>
            </Tooltip>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default GroupItem;
