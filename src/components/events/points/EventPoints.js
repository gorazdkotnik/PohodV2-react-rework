import React from 'react';

import EventPointQuestionGroup from './EventPointQuestionGroup';
import EventPointsList from './EventPointsList';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

const EventPoints = ({ event, points, onReloadEvent }) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [currentPoints, setCurrentPoints] = React.useState([]);

  const [selectedPoint, setSelectedPoint] = React.useState(null);

  const [questionGroups, setQuestionGroups] = React.useState(null);

  const [showQRCode, setShowQRCode] = React.useState({});

  const [showQuestionGroupSelection, setShowQuestionGroupSelection] =
    React.useState(false);

  React.useEffect(() => {
    points.forEach(point => {
      setShowQRCode(prevState => ({
        ...prevState,
        [point.point_id]: false,
      }));
    });

    const firstPoint = points.find(point => {
      return !points.some(p => p.next_point_id === point.point_id);
    });

    const remainingPoints = [];
    let currentPoint = firstPoint;
    while (currentPoint) {
      remainingPoints.push(currentPoint);
      currentPoint = points.find(
        point => point.point_id === currentPoint.next_point_id
      );
    }

    setCurrentPoints(remainingPoints);
  }, [points]);

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
      <EventPointsList
        event={event}
        currentPoints={currentPoints}
        setCurrentPoints={setCurrentPoints}
        points={points}
        onReloadEvent={onReloadEvent}
        showQRCode={showQRCode}
        setShowQRCode={setShowQRCode}
        setSelectedPoint={setSelectedPoint}
        setShowQuestionGroupSelection={setShowQuestionGroupSelection}
      />

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
