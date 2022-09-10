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

export const tableDefinitionsObj = {
  users: {
    table_name: 'users',
    id_column: 'user_id',

    translations: {
      singular: 'Uporabnik',
      plural: 'Uporabniki',
    },
    columns: {
      user_id: {
        translation: 'ID uporabnika',
        type: 'id',
      },
      email: {
        translation: 'E-naslov uporabnika',
        type: 'string',
      },
      user_type: {
        translation: 'Tip uporabnika',
        type: 'map',
        map: new Map([
          [0, 'Uporabnik'],
          [1, 'Učitelj'],
          [2, 'Administrator'],
        ]),
      },
      first_name: {
        translation: 'Ime',
        type: 'string',
      },
      last_name: {
        translation: 'Priimek',
        type: 'string',
      },
      group_id: {
        translation: 'ID skupine',
        type: 'foreign_id',
        foreign_table: 'groups',
      },
      school: {
        translation: 'Šola',
        type: 'string',
      },
      grade: {
        translation: 'Razred',
        type: 'string',
      },
    },
  },
  events: {
    table_name: 'events',
    id_column: 'event_id',

    translations: {
      singular: 'Dogodek',
      plural: 'Dogodki',
    },
    columns: {
      event_id: {
        translation: 'ID dogodka',
        type: 'id',
      },
      name: {
        translation: 'Ime dogodka',
        type: 'string',
      },
      date: {
        translation: 'Datum',
        type: 'date',
      },
      min_group_members: {
        translation: 'Najmanj članov v ekipi',
        type: 'number',
      },
      max_group_members: {
        translation: 'Največ članov v ekipi',
        type: 'number',
      },
      num_questions_at_point: {
        translation: 'Število vprašanj na točki',
        type: 'number',
      },
      points: {
        translation: 'Kontrolne točke',
        type: 'custom',
        custom_name: 'points',
      },
    },
  },
  groups: {
    table_name: 'groups',
    id_column: 'group_id',

    translations: {
      singular: 'Skupina',
      plural: 'Skupine',
    },
    columns: {
      group_id: {
        translation: 'ID skupine',
        type: 'id',
      },
      event_id: {
        translation: 'ID dogodka',
        type: 'foreign_id',
        foreign_table: 'events',
      },
      name: {
        translation: 'Ime skupine',
      },
      code: {
        translation: 'Koda skupine',
      },
      members: {
        translation: 'Člani ekipe',
        type: 'custom',
        custom_name: 'users',
      },
    },
  },
  question_groups: {
    table_name: 'question_groups',
    id_column: 'question_group_id',

    translations: {
      singular: 'Skupina vprašanj',
      plural: 'Skupine vprašanj',
    },
    columns: {
      question_group_id: {
        translation: 'ID skupine vprašanj',
        type: 'id',
      },
      name: {
        translation: 'Ime skupine vprašanj',
      },
      questions: {
        translation: 'Vprašanja',
        type: 'custom',
        custom_name: 'questions',
      },
    },
  },
  questions: {
    table_name: 'questions',
    id_column: 'question_id',

    translations: {
      singular: 'Vprašanje',
      plural: 'Vprašanja',
    },
    columns: {
      question_id: {
        translation: 'ID vprašanja',
        type: 'id',
      },
      question_group_id: {
        translation: 'ID skupine vprašanj',
        type: 'id',
      },
      text: {
        translation: 'Besedilo vprašanja',
      },
    },
  },
};

export const timerDuration = 30; // seconds

export const notificationTimeout = 5000;
