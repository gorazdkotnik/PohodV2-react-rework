import React from 'react';

import EventPointQuestionGroup from './EventPointQuestionGroup';
import EventPointsList from './EventPointsList';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

const EventPoints = ({ event, points, onReloadEvent }) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  // sort points by point.next_point_id
  const [currentPoints, setCurrentPoints] = React.useState(
    points.sort((a, b) => {
      if (a.next_point_id === null) return 1;
      if (b.next_point_id === null) return -1;
      if (a.next_point_id === b.point_id) return -1;
      if (b.next_point_id === a.point_id) return 1;
      return 0;
    })
  );

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
