import { useState, useEffect } from 'react';

import { useUIContext } from '../../context/UIContext';

import GradesList from '../../components/admin_groups/grades/GradesList';

import { request } from '../../utils/functions';

const AdminGroupsGrades = () => {
  const { setShowLoadingSpinner, setDialog } = useUIContext();

  const [grades, setGrades] = useState([]);

  useEffect(() => {
    setShowLoadingSpinner(true);
    request('/grades')
      .then(response => {
        setShowLoadingSpinner(false);
        setGrades(response);
      })
      .catch(error => {
        setShowLoadingSpinner(false);
        setDialog({
          title: 'Napaka pri pridobivanju razredov',
          text: 'Prišlo je do napake pri pridobivanju razredov. Poskusite znova.',
        });
      });
  }, [setShowLoadingSpinner, setDialog]);

  return <GradesList grades={grades} />;
};

export default AdminGroupsGrades;
