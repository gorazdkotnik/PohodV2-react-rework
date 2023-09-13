import React from 'react';
import { useUIContext } from '../../../context/UIContext';

import GroupItemDetails from './GroupItemDetails';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import GroupIcon from '@mui/icons-material/Group';

const GroupItem = ({ group, event, getGroups }) => {
  const { setDialog } = useUIContext();

  const [numberOfStudentsInGroup, setNumberOfStudentsInGroup] =
    React.useState(0);
  const [groupLeader, setGroupLeader] = React.useState(null);
  const [viewGroup, setViewGroup] = React.useState(false);

  React.useEffect(() => {
    setNumberOfStudentsInGroup(group?.members?.length || 0);

    if (group?.members?.length > 0) {
      const leader = group.members.find(
        member => member.user_id.toString() === group.leader_id.toString()
      );
      setGroupLeader(leader);
    }
  }, [group, setDialog, setNumberOfStudentsInGroup]);

  return (
    <>
      {groupLeader && (
        <GroupItemDetails
          viewGroup={viewGroup}
          setViewGroup={setViewGroup}
          group={group}
          groupLeader={groupLeader}
          getGroups={getGroups}
        />
      )}

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
            {groupLeader?.first_name} {groupLeader?.last_name},{' '}
            {groupLeader?.grade}
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
                onClick={() => {
                  setViewGroup(true);
                }}
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
    </>
  );
};

export default GroupItem;
