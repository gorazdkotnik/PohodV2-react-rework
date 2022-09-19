import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

import QRCode from 'react-qr-code';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';
import { FRONTEND_URL } from '../../config/env';

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

  const editPointNameHandler = () => {
    setEditingPointName(true);
  };

  const pointNameOnChangeHandler = event => {
    setPointName(event.target.value);
  };

  const savePointNameHandler = () => {
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
      });
  };

  const cancelPointNameHandler = () => {
    setEditingPointName(false);
    setPointName(point.name);
  };

  return (
    <Card key={point.point_id} sx={{ mb: 2 }}>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            {!editingPointName && (
              <Typography
                variant="h6"
                component="h2"
                onDoubleClick={editPointNameHandler}
              >
                {point.name}
              </Typography>
            )}

            {editingPointName && (
              <FormControl fullWidth sx={{ my: 2 }} variant="standard">
                <InputLabel htmlFor="pointName">Ime točke</InputLabel>
                <Input
                  id="pointName"
                  value={pointName}
                  onChange={pointNameOnChangeHandler}
                  error={pointNameInvalid}
                  autoFocus
                  onBlur={() => {
                    if (pointName !== point.name) {
                      savePointNameHandler();
                    } else {
                      cancelPointNameHandler();
                    }
                  }}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      savePointNameHandler();
                    }
                  }}
                />
              </FormControl>
            )}

            <Typography variant="body2" color="text.secondary">
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
              <Button
                variant="contained"
                color="success"
                onClick={() => downloadQRCode(point.hash, point.name)}
              >
                Shrani QR kodo
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() => {
                  setSelectedPoint(point);
                  setShowQuestionGroupSelection(true);
                }}
              >
                Izberi skupino vprašanj
              </Button>
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
