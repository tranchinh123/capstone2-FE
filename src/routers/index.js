export const routers = [
  {
    exact: true,
    path: '/',
    component: 'home',
    noHeader: true
  },
  {
    exact: true,
    path: '/course',
    component: 'course',
    noHeader: true,
    allow: ['learner', 'teacher']
  }
];
