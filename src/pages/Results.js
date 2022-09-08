import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { useUIContext } from '../context/UIContext';

import { request } from '../utils/functions';

const Results = () => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [results, setResults] = useState([]);

  useEffect(() => {
    request('/results/my_group')
      .then(data => {
        setShowLoadingSpinner(false);

        const newData = data.map((result, index) => {
          console.log(result);
          return [
            index + 1,
            result.point?.name,
            `${result.correct_answers} / ${result.all_answers}`,
          ];
        });

        setResults(newData);
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, mt: 5 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Ime točke</TableCell>
                    <TableCell>Pravilni odgovori / Vprašanja</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map(row => (
                    <TableRow
                      key={row[0]}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row[0]}
                      </TableCell>
                      <TableCell>{row[1]}</TableCell>
                      <TableCell>{row[2]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
