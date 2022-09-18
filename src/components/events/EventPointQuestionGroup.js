import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';

const EventPointQuestionGroup = ({
  event,
  point,
  points,
  open,
  onClose,
  questionGroups,
  onReloadEvent,
}) => {
  const { setDialog, setShowLoadingSpinner } = useUIContext();

  const changeQuestionGroupHandler = e => {
    updatePointQuestionGroup(point.point_id, e.target.value);
  };

  const updatePointQuestionGroup = (pointId, newQuestionGroupId) => {
    const updatedPoints = points.map(point => {
      if (point.point_id === pointId) {
        point.question_group_id = newQuestionGroupId;
      }
      return point;
    });

    setShowLoadingSpinner(true);
    request(`/points/${event.event_id}`, 'PUT', {
      points: updatedPoints,
    })
      .then(res => {
        setShowLoadingSpinner(false);

        onClose();
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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ zIndex: 500 }}
    >
      <DialogTitle id="alert-dialog-title">
        {`Spremeni skupino vprašanj za točko "${point.name}"`}
      </DialogTitle>
      <DialogContent>
        {questionGroups && questionGroups.length > 0 && (
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel id="questionGroupLabel">Skupina vprašanj</InputLabel>
            <Select
              labelId="questionGroupLabel"
              id="questionGroup"
              value={point.question_group_id}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Prekliči</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventPointQuestionGroup;
