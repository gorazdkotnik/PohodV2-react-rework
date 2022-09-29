import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import Table from '../../components/ui/Table';

import { useUIContext } from '../../context/UIContext';

import { request } from '../../utils/functions';
import { dashboard, tableDefinitionsObj } from '../../utils/consts';

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

          let newColumns = keys.map(key => {
            const translatedColumn =
              tableDefinitionsObj[id]?.columns[key]?.translation;

            return {
              field: key,
              headerName: translatedColumn ? translatedColumn : key,
              width: 300,
            };
          });

          newColumns = [
            { field: 'id', headerName: '#', width: 100 },
            ...newColumns,
          ];

          const newData = res.map((item, index) => {
            keys.forEach(key => {
              if (tableDefinitionsObj[id]?.columns[key]?.type === 'custom') {
                item[key] = tableDefinitionsObj[id]?.columns[key].custom_name;
              } else if (
                tableDefinitionsObj[id]?.columns[key]?.type === 'map'
              ) {
                item[key] = tableDefinitionsObj[id]?.columns[key].map.get(
                  +item[key]
                );
              }
            });

            return {
              id: index + 1,
              ...item,
            };
          });

          setColumns(newColumns);
          setData(newData);
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
        <Tooltip title="Nazaj na pregled nadzorne plošče">
          <Button
            variant="outlined"
            onClick={() => navigate('/dashboard')}
            sx={{ mb: 3 }}
          >
            Nazaj
          </Button>
        </Tooltip>

        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          {title}
        </Typography>

        {data && columns && data.length > 0 && columns.length > 0 && (
          <Table data={data} columns={columns} editUrl={id} />
        )}

        {(!data || data.length < 1) && (
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'light' }}
          >
            Ni podatkov za prikaz!
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardDetails;
