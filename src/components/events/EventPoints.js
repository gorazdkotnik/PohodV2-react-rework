import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import QRCode from 'react-qr-code';

import EventPointQuestionGroup from './EventPointQuestionGroup';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';
import { BACKEND_URL } from '../../config/env';

const EventPoints = ({ event, points, onReloadEvent }) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [pointsPerPage, setPointsPerPage] = React.useState(5);
  const [currentPoints, setCurrentPoints] = React.useState(
    points.slice(0, pointsPerPage)
  );

  const [selectedPoint, setSelectedPoint] = React.useState(null);

  const [questionGroups, setQuestionGroups] = React.useState(null);

  const [showQRCode, setShowQRCode] = React.useState({});

  const [showQuestionGroupSelection, setShowQuestionGroupSelection] =
    React.useState(false);

  const showMorePointsHandler = numberOfPoints => {
    setPointsPerPage(pointsPerPage + numberOfPoints);
    setCurrentPoints(points.slice(0, pointsPerPage + numberOfPoints));
  };

  const downloadQRCode = (pointHash, pointName) => {
    const svg = document.getElementById(`${pointHash}-qrcode`);

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svg);

    if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns="http://www.w3.org/2000/svg"'
      );
    }
    if (!source.match(/^<svg[^>]+"http:\/\/www\.w3\.org\/1999\/xlink"/)) {
      source = source.replace(
        /^<svg/,
        '<svg xmlns:xlink="http://www.w3.org/1999/xlink"'
      );
    }

    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    const url =
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;

    if (pointName)
      downloadLink.download = `${pointName
        .toLowerCase()
        .replace(/\s/g, '_')}.svg`;

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  React.useEffect(() => {
    setCurrentPoints(points.slice(0, pointsPerPage));

    points.forEach(point => {
      setShowQRCode(prevState => ({
        ...prevState,
        [point.point_id]: false,
      }));
    });
  }, [points, pointsPerPage]);

  React.useEffect(() => {
    setShowLoadingSpinner(true);
    request('/question_groups')
      .then(res => {
        setShowLoadingSpinner(false);
        setQuestionGroups(res);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju skupin vprašanj',
          text: 'Prišlo je do napake pri pridobivanju skupin vprašanj. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  return (
    <>
      {currentPoints.map(point => (
        <Card key={point.point_id} sx={{ mb: 2 }}>
          <CardContent>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Box>
                <Typography variant="h6" component="h2">
                  {point.name}
                </Typography>
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
                    {showQRCode[point.hash]
                      ? 'Skrij QR kodo'
                      : 'Prikaži QR kodo'}
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => downloadQRCode(point.hash, point.name)}
                  >
                    Shrani QR kodo
                  </Button>

                  <Button
                    variant="outlined"
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
            <Box
              sx={{ mt: 2, display: showQRCode[point.hash] ? 'block' : 'none' }}
            >
              <QRCode
                id={`${point.hash}-qrcode`}
                value={`${BACKEND_URL}/points/${point.hash}`}
                title={point.name}
              />
            </Box>
          </CardContent>
        </Card>
      ))}
      {pointsPerPage < points.length && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mt: 5 }}
        >
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              showMorePointsHandler(5);
            }}
          >
            <AddIcon />
          </Fab>
        </Stack>
      )}

      {selectedPoint && (
        <EventPointQuestionGroup
          open={showQuestionGroupSelection}
          onClose={() => setShowQuestionGroupSelection(false)}
          questionGroups={questionGroups}
          point={selectedPoint}
          points={points}
          event={event}
          onReloadEvent={onReloadEvent}
        />
      )}
    </>
  );
};

export default EventPoints;
