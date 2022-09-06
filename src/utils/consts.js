export const userTypes = {
  USER: '0',
  TEACHER: '1',
  ADMIN: '2',
};

export const dashboard = {
  tables: [
    {
      name: 'Uporabniki',
      to: '/dashboard/users',
    },
    {
      name: 'Skupine',
      to: '/dashboard/groups',
    },
    {
      name: 'Dogodki',
      to: '/dashboard/events',
    },
    {
      name: 'Skupine vprašanj',
      to: '/dashboard/question_groups',
    },
    {
      name: 'Vprašanja',
      to: '/dashboard/questions',
    },
  ],
};

export const notificationTimeout = 5000;
