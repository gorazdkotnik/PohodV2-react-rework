import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

import EventItem from '../../components/events/EventItem';

const EventDetails = () => {
  const { id } = useParams();

  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [event, setEvent] = useState(null);

  const getEvent = useCallback(() => {
    setShowLoadingSpinner(true);
    request(`/events/${id}`)
      .then(res => {
        setShowLoadingSpinner(false);
        setEvent(res);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju dogodka',
          text: 'Prišlo je do napake pri pridobivanju dogodka. Poskusite znova.',
        });
      });
  }, [id, setShowLoadingSpinner, setDialog]);

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const onReloadEventHandler = () => {
    getEvent();
  };

  return (
    <>
      {event && (
        <EventItem
          showDetails={true}
          event={event}
          onReloadEvent={onReloadEventHandler}
        />
      )}
    </>
  );
};

export default EventDetails;
