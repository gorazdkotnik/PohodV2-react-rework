import React, { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import Table from '../components/ui/Table';

import { useUIContext } from '../context/UIContext';

import { request } from '../utils/functions';

const UnregisteredUsers = () => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [unregisteredResults, setUnregisteredResults] = useState([]);
  const [unregisteredColumns, setUnregisteredColumns] = useState([]);

  const [noGroupResults, setNoGroupResults] = useState([]);
  const [noGroupColumns, setNoGroupColumns] = useState([]);

  useEffect(() => {
    request('/unregistered_users')
      .then(data => {
        setShowLoadingSpinner(false);
        const newData = data.map((user, index) => {
          return {
            id: index + 1,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            grade: user.grade,
            emso: user.emso,
          };
        });
        const newColumns = [
          { field: 'id', headerName: '#', width: 100 },
          { field: 'firstName', headerName: 'Ime', width: 200 },
          { field: 'lastName', headerName: 'Priimek', width: 200 },
          { field: 'email', headerName: 'E-pošta', width: 300 },
          { field: 'grade', headerName: 'Razred', width: 200 },
          { field: 'emso', headerName: 'EMŠO', width: 200 },
        ];
        setUnregisteredResults(newData);
        setUnregisteredColumns(newColumns);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju neregistriranih uporabnikov',
          text: 'Prišlo je do napake pri pridobivanju neregistriranih uporabnikov. Poskusite znova.',
        });
      });

    request('/users_with_no_group')
      .then(data => {
        setShowLoadingSpinner(false);
        const newData = data.map((user, index) => {
          return {
            id: index + 1,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            grade: user.grade,
            school: user.school,
          };
        });
        const newColumns = [
          { field: 'id', headerName: '#', width: 100 },
          { field: 'firstName', headerName: 'Ime', width: 200 },
          { field: 'lastName', headerName: 'Priimek', width: 200 },
          { field: 'email', headerName: 'E-pošta', width: 300 },
          { field: 'grade', headerName: 'Razred', width: 200 },
          { field: 'school', headerName: 'Šola', width: 200 },
        ];
        setNoGroupResults(newData);
        setNoGroupColumns(newColumns);
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju uporabnikov brez skupine',
          text: 'Prišlo je do napake pri pridobivanju uporbnikov brez skupine. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  return (
    <>
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
              Neregistrirani uporabniki
            </Typography>

            {unregisteredResults && unregisteredResults.length > 0 && (
              <Table
                data={unregisteredResults}
                columns={unregisteredColumns}
                pageSize={30}
              />
            )}
            {unregisteredResults && unregisteredResults.length < 1 && (
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: 'center', fontWeight: 'light' }}
              >
                Ni neregistriranih uporabnikov za prikaz!
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
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
              Uporabniki ki niso v skupini
            </Typography>

            {noGroupResults && noGroupResults.length > 0 && (
              <Table
                data={noGroupResults}
                columns={noGroupColumns}
                pageSize={30}
              />
            )}
            {noGroupResults && noGroupResults.length < 1 && (
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: 'center', fontWeight: 'light' }}
              >
                Ni uporabnikov ki niso v skupini za prikaz!
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default UnregisteredUsers;
