import React from 'react';

import PageMenu from '../../ui/PageMenu';

const AdminGroupsNavigation = () => {
  const labels = ['Razredi', 'Skupine'];
  const links = ['/admin-groups/grades', '/admin-groups/groups'];

  return <PageMenu labels={labels} links={links} />;
};

export default AdminGroupsNavigation;
