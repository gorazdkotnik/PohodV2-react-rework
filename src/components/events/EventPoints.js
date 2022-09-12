import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import QRCode from 'react-qr-code';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';
import { BACKEND_URL } from '../../config/env';

const EventPoints = ({ event, points, onReloadEvent }) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [pointsPerPage, setPointsPerPage] = React.useState(5);
  const [currentPoints, setCurrentPoints] = React.useState(
    points.slice(0, pointsPerPage)
  );

  const [questionGroups, setQuestionGroups] = React.useState(null);
  const [questionGroupId, setQuestionGroupId] = React.useState(null);

  const [showQRCode, setShowQRCode] = React.useState({});

  const changeQuestionGroupHandler = e => {
    setQuestionGroupId(e.target.value);

    updatePointQuestionGroup(e.target.value);
  };

  const showMorePointsHandler = numberOfPoints => {
    setPointsPerPage(pointsPerPage + numberOfPoints);
    setCurrentPoints(points.slice(0, pointsPerPage + numberOfPoints));
  };

  const updatePointQuestionGroup = pointId => {
    const updatedPoints = points.map(point => {
      if (point.point_id === pointId) {
        point.question_group_id = questionGroupId;
      }
      return point;
    });

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

        if (res.length > 0) {
          setQuestionGroupId(res[0].question_group_id);
        }
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
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    setShowQRCode(prevState => ({
                      ...prevState,
                      [point.hash]: !prevState[point.hash],
                    }));
                  }}
                >
                  {showQRCode[point.hash] ? 'Skrij QR kodo' : 'Prikaži QR kodo'}
                </Button>
              </Box>

              {questionGroups && questionGroups.length > 0 && (
                <FormControl fullWidth>
                  <InputLabel id="questionGroupLabel">
                    Skupina vprašanj
                  </InputLabel>
                  <Select
                    labelId="questionGroupLabel"
                    id="questionGroup"
                    value={questionGroupId}
                    label="Skupina vprašanj"
                    onChange={changeQuestionGroupHandler}
                  >
                    {questionGroups.map(questionGroup => (
                      <MenuItem
                        key={questionGroup.question_group_id}
                        value={questionGroup.question_group_id}
                      >
                        {questionGroup.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Stack>
            <Box sx={{ mt: 2 }}>
              {showQRCode[point.hash] && (
                <QRCode value={`${BACKEND_URL}/points/${point.hash}`} />
              )}
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
    </>
  );
};

export default EventPoints;