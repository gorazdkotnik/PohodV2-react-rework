import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import GroupsNavigation from '../../components/groups/GroupsNavigation';

import NewGroup from './NewGroup';
import JoinGroup from './JoinGroup';
import MyGroup from './MyGroup';

const Groups = ({ user }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [labels, setLabels] = useState([
    'Moja Skupina',
    'Nova Skupina',
    'Pridruži Se',
  ]);
  const [links, setLinks] = useState([
    '/groups/my_group',
    '/groups/new',
    '/groups/join',
  ]);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (user.group) {
      setLabels(['Moja Skupina']);
      setLinks(['/groups/my_group']);
    } else {
      setLabels(['Nova Skupina', 'Pridruži Se']);
      setLinks(['/groups/new', '/groups/join']);
    }

    setReady(true);

    if (pathname === '/groups') {
      if (user.group) {
        navigate('/groups/my_group');
      } else {
        navigate('/groups/join');
      }
    }
  }, [pathname, navigate, user]);

  return (
    <Card>
      <CardContent>
        {ready && <GroupsNavigation labels={labels} links={links} />}
        <Routes>
          {!user.group && <Route path="new" element={<NewGroup />} />}
          {!user.group && <Route path="join" element={<JoinGroup />} />}
          {user.group && (
            <Route path="my_group" element={<MyGroup user={user} />} />
          )}
        </Routes>
      </CardContent>
    </Card>
  );
};

export default Groups;
