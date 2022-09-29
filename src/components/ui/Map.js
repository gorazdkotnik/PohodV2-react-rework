import React from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';

import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';

import { useUIContext } from '../../context/UIContext';

const position = [46.386079810551266, 15.087464857546308];

function HandleMapClick({ onMapClickHandler = () => {} }) {
  useMapEvents({
    click: onMapClickHandler,
  });
  return null;
}

const Map = ({
  points = [],
  className = 'leaflet-container',
  onMarkerClickHandler = () => {},
  onMapClickHandler,
  editMode = false,
} = {}) => {
  const { setDialog } = useUIContext();

  return (
    <div className={className}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={editMode}
      >
        <Alert severity="warning" variant="filled" sx={{ width: '100%' }}>
          Trenutno ste v načinu urejanja točk. Kliknite na zemljevid, da dodate
          točko. Za brisanje točke kliknite na točko na zemljevidu, da se vam
          prikaže meni za brisanje. Če želite prekiniti način urejanja točk,
          kliknite na gumb "Prekini urejanje" (enak gumb, ki ste ga uporabili za
          prehod v ta način).
        </Alert>
      </Snackbar>

      <MapContainer
        className={className}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HandleMapClick
          onMapClickHandler={e => {
            if (editMode) {
              onMapClickHandler(e);
            }
          }}
        />
        {points.map(point => {
          const pointsWithSameCoordinates = points.filter(
            p =>
              p.location_lat === point.location_lat &&
              p.location_long === point.location_long
          );

          const pointText = pointsWithSameCoordinates
            .map(p => p.name)
            .join(', ');

          return (
            <Marker
              position={[+point.location_lat, +point.location_long]}
              key={point.point_id}
            >
              {editMode && (
                <Popup>
                  <p>{pointText}</p>
                  {onMapClickHandler && onMarkerClickHandler && (
                    <Tooltip title="Izbriši to točko">
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          if (editMode) {
                            setDialog({
                              title: 'Izbriši točko',
                              text: `Ali ste prepričani, da želite izbrisati točko "${point.name}"?`,
                              onClose: onMarkerClickHandler.bind(
                                null,
                                point.point_id
                              ),
                            });
                          }
                        }}
                      >
                        Izbriši
                      </Button>
                    </Tooltip>
                  )}
                </Popup>
              )}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
