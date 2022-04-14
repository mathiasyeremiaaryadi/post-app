<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>See All Posts</strong>
        </CCardHeader>
        <CCardBody>
          <p class="text-medium-emphasis small">
            Please, choose the post status
          </p>
          <CNav variant="tabs" class="justify-content-center">
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                :active="tabPaneActiveKey === 1"
                @click="
                  () => {
                    tabPaneActiveKey = 1
                  }
                "
              >
                Published ({{ totalPublished }})
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                :active="tabPaneActiveKey === 2"
                @click="
                  () => {
                    tabPaneActiveKey = 2
                  }
                "
              >
                Drafts ({{ totalDrafted }})
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="javascript:void(0);"
                :active="tabPaneActiveKey === 3"
                @click="
                  () => {
                    tabPaneActiveKey = 3
                  }
                "
              >
                Trashed ({{ totalTrashed }})
              </CNavLink>
            </CNavItem>
          </CNav>
          <CTabContent>
            <CTabPane
              role="tabpanel"
              aria-labelledby="home-tab"
              :visible="tabPaneActiveKey === 1"
            >
              <CAlert
                color="success"
                variant="solid"
                dismissible
                @close="resetMessage()"
                v-if="success.length != 0"
                class="mt-3"
              >
                {{ success }}
              </CAlert>
              <CTable class="mt-3" v-if="totalPublished > 0">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col" class="w-50"
                      >Title</CTableHeaderCell
                    >
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow
                    v-for="(published_post, index) in published_posts"
                    :key="published_post.id"
                  >
                    <CTableHeaderCell scope="row">{{
                      index + 1
                    }}</CTableHeaderCell>
                    <CTableDataCell>{{ published_post.title }}</CTableDataCell>
                    <CTableDataCell>{{
                      published_post.category
                    }}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger"
                        class="ms-2"
                        @click="
                          () => {
                            deleteConfirmation = true
                            selectedId = published_post.id
                          }
                        "
                      >
                        <i class="fa-solid fa-trash text-white"></i>
                      </CButton>
                      <router-link
                        :to="{
                          name: 'Edit Post',
                          params: { id: published_post.id },
                        }"
                        class="ms-2 btn btn-warning"
                      >
                        <CIcon icon="cil-pencil" />
                      </router-link>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <div class="row justify-content-center" v-else>
                <CCol sm="12">
                  <h5 class="text-center mt-5">No Published Post Here</h5>
                </CCol>
              </div>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="profile-tab"
              :visible="tabPaneActiveKey === 2"
            >
              <CAlert
                color="success"
                variant="solid"
                dismissible
                @close="resetMessage()"
                v-if="success.length != 0"
                class="mt-3"
              >
                {{ success }}
              </CAlert>
              <CTable class="mt-3" v-if="totalDrafted > 0">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col" class="w-50"
                      >Title</CTableHeaderCell
                    >
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow
                    v-for="(drafted_post, index) in drafted_posts"
                    :key="drafted_post.id"
                  >
                    <CTableHeaderCell scope="row">{{
                      index + 1
                    }}</CTableHeaderCell>
                    <CTableDataCell>{{ drafted_post.title }}</CTableDataCell>
                    <CTableDataCell>{{ drafted_post.category }}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger"
                        class="ms-2"
                        @click="
                          () => {
                            deleteConfirmation = true
                            selectedId = drafted_post.id
                          }
                        "
                      >
                        <i class="fa-solid fa-trash text-white"></i>
                      </CButton>
                      <router-link
                        :to="{
                          name: 'Edit Post',
                          params: { id: drafted_post.id },
                        }"
                        class="ms-2 btn btn-warning"
                      >
                        <CIcon icon="cil-pencil" />
                      </router-link>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <div class="row justify-content-center" v-else>
                <CCol sm="12">
                  <h5 class="text-center mt-5">No Drafted Post Here</h5>
                </CCol>
              </div>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="contact-tab"
              :visible="tabPaneActiveKey === 3"
            >
              <CAlert
                color="success"
                variant="solid"
                dismissible
                @close="resetMessage()"
                v-if="success.length != 0"
                class="mt-3"
              >
                {{ success }}
              </CAlert>
              <CTable class="mt-3" v-if="totalTrashed > 0">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col" class="w-50"
                      >Title</CTableHeaderCell
                    >
                    <CTableHeaderCell scope="col">Category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow
                    v-for="(trashed_post, index) in trashed_posts"
                    :key="trashed_post.id"
                  >
                    <CTableHeaderCell scope="row">{{
                      index + 1
                    }}</CTableHeaderCell>
                    <CTableDataCell>{{ trashed_post.title }}</CTableDataCell>
                    <CTableDataCell>{{ trashed_post.category }}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="danger"
                        class="ms-2"
                        @click="
                          () => {
                            deleteConfirmation = true
                            selectedId = trashed_post.id
                          }
                        "
                      >
                        <i class="fa-solid fa-trash text-white"></i>
                      </CButton>
                      <router-link
                        :to="{
                          name: 'Edit Post',
                          params: { id: trashed_post.id },
                        }"
                        class="ms-2 btn btn-warning"
                      >
                        <CIcon icon="cil-pencil" />
                      </router-link>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
              <div class="row justify-content-center" v-else>
                <CCol sm="12">
                  <h5 class="text-center mt-5">No Trashed Post Here</h5>
                </CCol>
              </div>
            </CTabPane>
          </CTabContent>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <CModal
    :visible="deleteConfirmation"
    @close="
      () => {
        deleteConfirmation = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Confirmation</CModalTitle>
    </CModalHeader>
    <CModalBody
      ><p>Are you sure want to move this article to the trash?</p>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            deleteConfirmation = false
          }
        "
      >
        No
      </CButton>
      <CButton color="primary" @click="updateStatus()">Yes</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import PostService from '../service/PostService'
export default {
  name: 'AllPosts',
  data() {
    return {
      tabPaneActiveKey: 1,
      selectedId: null,
      deleteConfirmation: false,
      published_posts: [],
      drafted_posts: [],
      trashed_posts: [],
      success: '',
    }
  },

  computed: {
    totalPublished: function () {
      return this.published_posts.length
    },

    totalDrafted: function () {
      return this.drafted_posts.length
    },

    totalTrashed: function () {
      return this.trashed_posts.length
    },
  },

  methods: {
    resetMessage() {
      this.success = ''
    },

    updateStatus() {
      PostService.updatePostStatus(this.selectedId)
        .then((response) => {
          if (response.data.code == 200) {
            this.success = response.data.data
            this.deleteConfirmation = false
            this.getPublishedPosts()
            this.getDraftedPosts()
            this.getTrashedPosts()
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getPublishedPosts() {
      PostService.getPublishedPosts()
        .then((response) => {
          this.published_posts = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getDraftedPosts() {
      PostService.getDraftedPosts()
        .then((response) => {
          this.drafted_posts = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    getTrashedPosts() {
      PostService.getTrashedPosts()
        .then((response) => {
          this.trashed_posts = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },

  mounted() {
    this.getPublishedPosts()
    this.getDraftedPosts()
    this.getTrashedPosts()
  },
}
</script>
