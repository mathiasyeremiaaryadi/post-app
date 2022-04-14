export default [
  {
    component: 'CNavGroup',
    name: 'Posts',
    icon: 'cil-notes',
    items: [
      {
        component: 'CNavItem',
        name: 'All Posts',
        to: '/all-posts',
      },
      {
        component: 'CNavItem',
        name: 'Add New',
        to: '/add-post',
      },
      {
        component: 'CNavItem',
        name: 'Preview Posts',
        to: '/preview-posts',
      },
    ],
  },
]
