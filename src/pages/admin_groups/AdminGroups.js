import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import AdminGroupsGrades from './AdminGroupsGrades';
import AdminGroupsGroups from './AdminGroupsGroups';

import AdminGroupsNavigation from '../../components/admin_groups/navigation/AdminGroupsNavigation';

const Events = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/admin-groups') {
      navigate('/admin-groups/grades');
    }
  }, [pathname, navigate]);

  return (
    <Card>
      <CardContent>
        <AdminGroupsNavigation />
        <Routes>
          <Route path="grades" element={<AdminGroupsGrades />} />
          <Route path="groups" element={<AdminGroupsGroups />} />
        </Routes>
      </CardContent>
    </Card>
  );
};

export default Events;
