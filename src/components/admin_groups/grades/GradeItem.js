import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUIContext } from '../../../context/UIContext';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import AssessmentIcon from '@mui/icons-material/Assessment';

import { request } from '../../../utils/functions';

const GradesItem = ({ grade }) => {
  const { setDialog } = useUIContext();

  const [numberOfSignedStudents, setNumberOfSignedStudents] = React.useState(0);
  const [numberOfStudentsInGroup, setNumberOfStudentsInGroup] =
    React.useState(0);

  React.useEffect(() => {
    request(`/grades/${grade.grade_id}`)
      .then(data => {
        setNumberOfSignedStudents(data.length);

        // TODO: Remove this after the backend is fixed
        data.forEach(element => {
          console.log(element.group_id);
        });
      })
      .catch(error => {
        setDialog({
          title: 'Napaka pri pridobivanju števila prijavljenih učencev',
          text: 'Prišlo je do napake pri pridobivanju števila prijavljenih učencev. Poskusite znova.',
        });
      });
  }, [grade, setDialog, setNumberOfSignedStudents]);

  return (
    <Card sx={{ my: 4 }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ p: 1 }}
          backgroundColor="secondary"
        >
          {grade.name}
        </Typography>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Tooltip title="Oglejte si podrobnosti razreda">
            <Button
              variant="outlined"
              component={NavLink}
              to={`/admin-groups/grades/${grade.grade_id}`}
              disabled={true}
            >
              Oglej si razred
            </Button>
          </Tooltip>

          <Tooltip title="Število dijakov v skupini / Število prijavljenih dijakov">
            <Button variant="contained">
              <AssessmentIcon />
              {numberOfStudentsInGroup} / {numberOfSignedStudents}
            </Button>
          </Tooltip>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default GradesItem;
