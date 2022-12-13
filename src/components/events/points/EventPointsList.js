import React from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import EventPointItem from './EventPointItem';

import { useUIContext } from '../../../context/UIContext';

import { request } from '../../../utils/functions';

const EventPointsList = ({
  event,
  currentPoints,
  setCurrentPoints,
  points,
  onReloadEvent,
  showQRCode,
  setShowQRCode,
  setSelectedPoint,
  setShowQuestionGroupSelection,
}) => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const handleDrop = droppedItem => {
    if (!droppedItem.destination) return;
    let updatedList = [...currentPoints];

    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

    updatedList.forEach((point, index) => {
      if (index === updatedList.length - 1) {
        point.next_point_id = null;
      } else {
        point.next_point_id = updatedList[index + 1].point_id;
      }
    });

    setCurrentPoints(updatedList);

    setShowLoadingSpinner(true);
    request(`/points/${event.event_id}`, 'PUT', {
      points: updatedList,
    })
      .then(res => {
        setShowLoadingSpinner(false);
        onReloadEvent();
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri shranjevanju točk',
          text: 'Prišlo je do napake pri shranjevanju točk. Poskusite znova.',
        });
      });
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

  return (
    <>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {provided => (
            <div
              className="list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {currentPoints.map((point, index) => (
                <Draggable
                  key={point.point_id}
                  draggableId={point.point_id}
                  index={index}
                >
                  {provided => (
                    <div
                      className="item-container"
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <EventPointItem
                        key={point.point_id}
                        point={point}
                        event={event}
                        points={points}
                        showQRCode={showQRCode}
                        setShowQRCode={setShowQRCode}
                        downloadQRCode={downloadQRCode}
                        setSelectedPoint={setSelectedPoint}
                        setShowQuestionGroupSelection={
                          setShowQuestionGroupSelection
                        }
                        onReloadEvent={onReloadEvent}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default EventPointsList;
