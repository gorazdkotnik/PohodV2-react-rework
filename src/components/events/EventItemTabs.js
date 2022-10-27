import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import DescriptionIcon from '@mui/icons-material/Description';

import TabPanel from '../ui/TabPanel';

import EventsForm from './EventsForm';
import EventPoints from './points/EventPoints';

import { useUIContext } from '../../context/UIContext';
import { BACKEND_URL } from '../../config';

const EventItemTabs = ({ event, onReloadEvent, onDeleteHandler }) => {
  const { setDialog } = useUIContext();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Uredi" />
          <Tab label="Točke" />
          <Tab label="Ostala dejanja" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EventsForm data={event} method="PUT" show={true} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EventPoints
          points={event.points}
          event={event}
          onReloadEvent={onReloadEvent}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="flex-start"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Tooltip title="Prenesi seznam skupin v Excel-u" placement="top">
            <Button
              variant="outlined"
              color="success"
              endIcon={<DescriptionIcon />}
              onClick={() => {
                window.open(
                  `${BACKEND_URL}/events/${event.event_id}/spreadsheet`,
                  '_blank',
                  'noopener,noreferrer'
                );
              }}
            >
              Prenesi seznam skupin
            </Button>
          </Tooltip>

          {/* Delete event */}
          <Tooltip title="Izbrišite dogodek na katerem se trenutno nahajate">
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setDialog({
                  title: 'Brisanje dogodka',
                  text: 'Ali ste prepričani, da želite izbrisati dogodek?',
                  onClose: onDeleteHandler,
                });
              }}
            >
              Izbriši dogodek
            </Button>
          </Tooltip>
        </Stack>
      </TabPanel>
    </Box>
  );
};

export default EventItemTabs;
