export const routers = [
  {
    exact: true,
    path: '/',
    direct: 'home',
    component: 'home',
    noHeader: true
  },
  {
    exact: true,
    path: '/courses',
    direct: 'courses',
    component: 'courses',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/courses/:id',
    direct: 'course-detail',
    component: 'course-detail',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/course-create',
    direct: 'course-create',
    component: 'course-create',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/course-manage-description/:id',
    direct: 'course-manage-description',
    component: 'course-manage-description',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/course-manage-content/:id',
    direct: 'course-manage-content',
    component: 'course-manage-content',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/excercise',
    direct: 'excercise',
    component: 'excercise',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/excercise/edit',
    direct: 'excercise/edit',
    component: 'edit',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/course-learning',
    direct: 'course-learning',
    component: 'course-learning',
    noHeader: true,
    noLayout: true
  },
  {
    exact: true,
    path: '/question',
    direct: 'question',
    component: 'question',
    noHeader: true
  },
  {
    exact: true,
    path: '/question/edit',
    direct: 'question/edit',
    component: 'edit',
    noHeader: true,
    allow: ['learner', 'teacher']
  },
  {
    exact: true,
    path: '/question/create',
    direct: 'question/create',
    component: 'create',
    noHeader: true,
    allow: ['learner', 'teacher']
  }
];