import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Table from '../components/ui/Table';

import { useUIContext } from '../context/UIContext';

import { request } from '../utils/functions';

const Results = () => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [results, setResults] = useState([]);
  const [resultsColumns, setResultsColumns] = useState([]);

  useEffect(() => {
    request('/results/my_group')
      .then(data => {
        setShowLoadingSpinner(false);

        const newData = data.map((result, index) => {
          return {
            id: index + 1,
            pointName: result.point?.name,
            correctAnswers: `${result.correct_answers} / ${result.all_answers}`,
          };
        });

        const newColumns = [
          { field: 'id', headerName: '#', width: 100 },
          { field: 'pointName', headerName: 'Ime točke', width: 300 },
          {
            field: 'correctAnswers',
            headerName: 'Pravilni odgovori / Vprašanja',
            width: 300,
          },
        ];

        setResults(newData);
        setResultsColumns(newColumns);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju odgovorov',
          text: 'Prišlo je do napake pri pridobivanju odgovorov. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  return (
    <Card>
      <CardContent>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          {/* Headings */}
          <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
            Moji odgovori
          </Typography>
          <Typography variant="p" gutterBottom sx={{ textAlign: 'center' }}>
            Prikaz odgovorov za posamezne točke{' '}
          </Typography>

          {/* Table */}
          {results && results.length > 0 && (
            <Table data={results} columns={resultsColumns} />
          )}
          {results && results.length < 1 && (
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
              Ni odgovorov za prikaz!
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Results;
