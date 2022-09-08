import { useEffect, useState } from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';
import { dashboard } from '../../utils/consts';

const DashboardDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [title, setTitle] = useState('');

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    setTitle(dashboard.tables.find(item => item.to.includes(id))?.name);

    setShowLoadingSpinner(true);
    request(`/${id}`)
      .then(res => {
        setShowLoadingSpinner(false);

        let keys;

        if (res && res.length > 0) {
          keys = Object.keys(res[0]);

          setColumns(keys);

          setData(
            res.map(item => {
              return keys.map(key => {
                return typeof item[key] === 'object' ? 'object' : item[key];
              });
            })
          );
        }
      })
      .catch(err => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju podatkov',
          text: 'Prišlo je do napake pri pridobivanju podatkov. Poskusite znova.',
        });
      });
  }, [id, setShowLoadingSpinner, setDialog]);

  return (
    <Card>
      <CardContent>
        <Fab size="small" color="primary" aria-label="add">
          <ArrowBack onClick={() => navigate('/dashboard')} />
        </Fab>

        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          {title}
        </Typography>

        {data && columns && data.length > 0 && columns.length > 0 && (
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: columns.length * 200, mt: 5 }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  {columns.map(column => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map(row => (
                  <TableRow
                    key={row[0]}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {row.map((cell, index) => (
                      <TableCell key={index}>
                        {typeof cell === 'object' ? (
                          <NavLink to={`/${id}/${cell.id}`}>
                            {cell.name}
                          </NavLink>
                        ) : (
                          cell
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {(!data || data.length < 1) && (
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            Ni podatkov za prikaz!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardDetails;
