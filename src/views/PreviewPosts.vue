<template>
  <CRow>
    <CCol :xs="12">
      <CCard
        class="mb-4 shadow"
        v-for="published_post in published_posts"
        :key="published_post.id"
      >
        <CCardHeader component="h5">{{ published_post.title }}</CCardHeader>
        <CCardBody>
          <CCardText>
            {{ published_post.content }}
          </CCardText>
          <CCardText
            ><small class="text-muted">{{
              published_post.category
            }}</small></CCardText
          >
        </CCardBody>
      </CCard>

      <div class="row justify-content-center" v-if="published_posts.length > 0">
        <CCol sm="1">
          <CFormSelect size="sm" v-model="limit">
            <option disabled>Post limit</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </CFormSelect>
        </CCol>

        <CCol sm="4">
          <Pagination
            :total-pages="totalPages"
            :per-page="parseInt(limit)"
            :current-page="currentPage"
            @pagechanged="onPageChanged"
          />
        </CCol>
      </div>

      <div class="row justify-content-center" v-else>
        <CCol sm="12">
          <h5 class="text-center">No Post Here</h5>
        </CCol>
      </div>
    </CCol>
  </CRow>
</template>

<script>
import Pagination from '../components/Pagination'
import PostService from '../service/PostService'

export default {
  components: {
    Pagination,
  },
  name: 'PreviewPosts',
  data() {
    return {
      tabPaneActiveKey: 1,
      published_posts: [],
      limit: '5',
      totalPages: 0,
      currentPage: 1,
      totalPosts: 0,
    }
  },

  computed: {
    offset() {
      return (this.currentPage - 1) * this.limit
    },
  },

  watch: {
    limit() {
      this.getPosts()
    },
  },

  methods: {
    getPosts() {
      PostService.getPublishedPosts()
        .then((response) => {
          this.published_posts = response.data.data
          this.totalPosts = this.published_posts.length
          this.totalPages = Math.ceil(this.totalPosts / parseInt(this.limit))
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getPublishedPosts() {
      PostService.getPosts(this.limit, this.offset)
        .then((response) => {
          this.published_posts = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    onPageChanged(currentPage) {
      this.currentPage = currentPage
      this.getPublishedPosts()
    },
  },

  mounted() {
    this.getPosts()
  },
}
</script>
