import { createRouter, createWebHashHistory } from 'vue-router'

import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    name: 'Posts',
    component: DefaultLayout,
    children: [
      {
        path: '/all-posts',
        name: 'All Posts',
        component: () => import('@/views/AllPosts.vue'),
      },
      {
        path: '/add-post',
        name: 'Add Post',
        component: () => import('@/views/AddPost.vue'),
      },
      {
        path: '/preview-posts',
        name: 'Preview Posts',
        component: () => import('@/views/PreviewPosts.vue'),
      },
      {
        path: '/edit-post/:id',
        name: 'Edit Post',
        component: () => import('@/views/EditPost.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router
