/* eslint-disable prettier/prettier */
import { AXIOS_SERVICE } from './AxiosService'

export default {
  getPosts(limit = 0, offset = 0) {
    return AXIOS_SERVICE.get(`/article/${limit}/${offset}`)
  },

  getPublishedPosts() {
    return AXIOS_SERVICE.get(`/article/published`)
  },

  getDraftedPosts() {
    return AXIOS_SERVICE.get(`/article/drafted`)
  },

  getTrashedPosts() {
    return AXIOS_SERVICE.get(`/article/trashed`)
  },

  getPost(id) {
    return AXIOS_SERVICE.get(`/article/${id}`)
  },

  storePost(data) {
    return AXIOS_SERVICE.post(`/article`, data)
  },

  updatePost(id, data) {
    return AXIOS_SERVICE.put(`/article/${id}`, data)
  },

  updatePostStatus(id) {
    return AXIOS_SERVICE.put(`/article/status/${id}`)
  },

  deletePost(id) {
    return AXIOS_SERVICE.delete(`/article/${id}`)
  },
}
