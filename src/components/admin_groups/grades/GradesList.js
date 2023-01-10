import React from 'react';

import Typography from '@mui/material/Typography';

import GradeItem from './GradeItem';

const GradesList = ({ grades }) => {
  console.log(grades);

  return (
    <>
      {grades &&
        grades.length > 0 &&
        grades.map(grade => <GradeItem key={grade.grade_id} grade={grade} />)}
      {grades && grades.length === 0 && (
        <Typography
          variant="h6"
          component="h2"
          align="center"
          sx={{ mt: 2, fontWeight: 'light' }}
        >
          Ni razredov za prikaz!
        </Typography>
      )}
    </>
  );
};

export default GradesList;
