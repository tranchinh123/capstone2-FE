
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
    path: '/course-create',
    component: 'course-create',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/course-manage-description',
    component: 'course-manage-description',
    noHeader: true,
    allow: ['learner', 'teacher']
  }
];
