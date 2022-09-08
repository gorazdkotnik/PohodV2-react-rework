import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const MyGroupAlert = ({ user, minGroupMembers, maxGroupMembers }) => {
  const title = `${
    user.group.members.length > maxGroupMembers ? 'Preveč' : 'Premalo'
  } članov v skupini!`;

  return (
    <>
      {minGroupMembers &&
        maxGroupMembers &&
        (user.group.members.length < minGroupMembers ||
          user.group.members.length > maxGroupMembers) && (
          <Alert severity="error" sx={{ my: 2 }}>
            <AlertTitle>{title}</AlertTitle>
            Skupina vsebuje{' '}
            {user.group.members.length > maxGroupMembers
              ? 'preveč'
              : 'premalo'}{' '}
            članov ({user.group.members.length}), kar pomeni, da se dogodka ne
            bo smela udeležiti.<br></br>
            <br></br>
            Najmanjše število članov v ekipi za ta dogodek: {minGroupMembers}
            <br></br>
            <br></br>
            Največje število članov v ekipi za ta dogodek: {maxGroupMembers}.
          </Alert>
        )}
    </>
  );
};

export default MyGroupAlert;
