export const routers = [
  {
    exact: true,
    path: '/',
    component: 'home',
    noHeader: true
  },
  {
    exact: true,
    path: '/courses',
    component: 'courses',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/courses/:id',
    component: 'course-detail',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/course-create',
    component: 'course-create',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/course-manage-description/:id',
    component: 'course-manage-description',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/course-manage-content/:id',
    component: 'course-manage-content',
    noHeader: true,
    allow: ['learner', 'teacher']
  }
];
