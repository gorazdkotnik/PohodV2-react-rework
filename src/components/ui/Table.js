import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const Table = ({ data, columns, pageSize = 10 }) => {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[pageSize]}
      />
    </Box>
  );
};

export default Table;
