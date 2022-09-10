import React from 'react';

import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';

import { request } from '../../utils/functions';

const useMutation = editUrl => {
  return React.useCallback(
    entity => {
      const newEntity = { ...entity };

      delete newEntity.id;

      return request(
        `/${editUrl}/${entity[`${editUrl.slice(0, -1)}_id`]}`,
        'PUT',
        newEntity
      );
    },
    [editUrl]
  );
};

const Table = ({ data, columns, editUrl }) => {
  const mutateRow = useMutation(`/${editUrl}`);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    async newRow => {
      console.log(newRow);

      const response = await mutateRow(newRow);
      setSnackbar({
        children: 'Entiteta je bila uspešno spremenjena',
        severity: 'success',
      });
      return response;
    },
    [mutateRow]
  );

  const handleProcessRowUpdateError = React.useCallback(error => {
    setSnackbar({ children: error.message, severity: 'error' });

    console.log(error);
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        experimentalFeatures={{ newEditingApi: true }}
      />
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </Box>
  );
};

export default Table;
