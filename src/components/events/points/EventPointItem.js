import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import QRCode from 'react-qr-code';

import EventPointEditName from './EventPointEditName';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';
import { FRONTEND_URL } from '../../../config';

const EventPointItem = ({
  point,
  points,
  event,
  showQRCode,
  setShowQRCode,
  downloadQRCode,
  setSelectedPoint,
  setShowQuestionGroupSelection,
  onReloadEvent,
}) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [editingPointName, setEditingPointName] = React.useState(false);

  const [pointName, setPointName] = React.useState(point.name);
  const [pointNameInvalid, setPointNameInvalid] = React.useState(false);

  const pointNameOnChangeHandler = event => {
    setPointName(event.target.value);
  };

  const savePointNameHandler = () => {
    setPointNameInvalid(false);

    if (pointName.trim() === '' || pointName.trim().length > 50) {
      setPointNameInvalid(true);
      return;
    }

    const updatedPoints = points.map(p => {
      if (p.point_id === point.point_id) {
        p.name = pointName;
      }
      return p;
    });

    setShowLoadingSpinner(true);

    setShowLoadingSpinner(true);
    request(`/points/${event.event_id}`, 'PUT', {
      points: updatedPoints,
    })
      .then(res => {
        setShowLoadingSpinner(false);

        onReloadEvent();
      })
      .catch(e => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri točkah',
          text: 'Prišlo je do napake pri spreminjanju točk. Poskusite znova.',
        });
      })
      .finally(() => {
        setEditingPointName(false);
      });
  };

  return (
    <Card key={point.point_id} sx={{ my: 2 }}>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Box sx={{ width: '100%' }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
              sx={{ width: '100%' }}
            >
              <Typography variant="h6" component="h2">
                {point.name}
              </Typography>

              <Tooltip title="Uredi ime točke">
                <IconButton
                  onClick={() => {
                    setEditingPointName(true);
                  }}
                >
                  <EditIcon color="warning" />
                </IconButton>
              </Tooltip>
            </Stack>

            {editingPointName && (
              <EventPointEditName
                open={editingPointName}
                handleClose={() => {
                  setEditingPointName(false);
                }}
                pointName={pointName}
                pointNameOnChangeHandler={pointNameOnChangeHandler}
                pointNameInvalid={pointNameInvalid}
                savePointNameHandler={savePointNameHandler}
              />
            )}

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: { xs: 'center', sm: 'initial' } }}
            >
              {point.location_lat}, {point.location_long}
            </Typography>

            {/* button to show qr code */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="flex-start"
              alignItems="center"
              spacing={1}
              sx={{ mt: 1 }}
            >
              <Tooltip title="Prikaži QR kodo te točke">
                <Button
                  variant={showQRCode[point.hash] ? 'contained' : 'outlined'}
                  onClick={() => {
                    setShowQRCode(prevState => ({
                      ...prevState,
                      [point.hash]: !prevState[point.hash],
                    }));
                  }}
                >
                  {showQRCode[point.hash] ? 'Skrij QR kodo' : 'Prikaži QR kodo'}
                </Button>
              </Tooltip>

              <Tooltip title="Prenesi QR kodo te točke na računalnik">
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => downloadQRCode(point.hash, point.name)}
                >
                  Shrani QR kodo
                </Button>
              </Tooltip>

              <Tooltip title="Izberite področje vprašanj te točke">
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    setSelectedPoint(point);
                    setShowQuestionGroupSelection(true);
                  }}
                >
                  Izberi področje vprašanj
                </Button>
              </Tooltip>
            </Stack>
          </Box>
        </Stack>
        <Box sx={{ mt: 2, display: showQRCode[point.hash] ? 'block' : 'none' }}>
          <QRCode
            id={`${point.hash}-qrcode`}
            value={`${FRONTEND_URL}/points/${point.hash}`}
            title={point.name}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventPointItem;
