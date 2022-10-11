import React from 'react';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

import EventPointQuestionGroup from './EventPointQuestionGroup';
import EventPointItem from './EventPointItem';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

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
          title: 'Napaka pri pridobivanju področji vprašanj',
          text: 'Prišlo je do napake pri pridobivanju področji vprašanj. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  return (
    <>
      {currentPoints.map(point => (
        <EventPointItem
          key={point.point_id}
          point={point}
          event={event}
          points={points}
          showQRCode={showQRCode}
          setShowQRCode={setShowQRCode}
          downloadQRCode={downloadQRCode}
          setSelectedPoint={setSelectedPoint}
          setShowQuestionGroupSelection={setShowQuestionGroupSelection}
          onReloadEvent={onReloadEvent}
        />
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
