<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Edit Post Article</strong>
        </CCardHeader>
        <CCardBody>
          <CAlert
            color="success"
            variant="solid"
            dismissible
            @close="resetMessage()"
            v-if="success.length != 0"
          >
            {{ success }}
          </CAlert>
          <CForm>
            <div class="mb-3">
              <CFormLabel for="title">Title</CFormLabel>
              <CFormInput
                id="title"
                type="text"
                placeholder="Article title here"
                v-if="validationError.title !== undefined"
                v-model="post.title"
                invalid
              />
              <CFormInput
                id="title"
                type="text"
                placeholder="Article title
              here"
                v-if="validationError.title === undefined"
                v-model="post.title"
              />
              <CFormFeedback
                invalid
                v-if="validationError.title !== undefined"
                >{{ validationError.title }}</CFormFeedback
              >
            </div>
            <div class="mb-3">
              <CFormLabel for="content">Content</CFormLabel>
              <CFormTextarea
                id="content"
                rows="3"
                v-model="post.content"
                v-if="validationError.content !== undefined"
                invalid
              ></CFormTextarea>
              <CFormTextarea
                id="content"
                rows="3"
                v-model="post.content"
                v-if="validationError.content === undefined"
              ></CFormTextarea>
              <CFormFeedback
                invalid
                v-if="validationError.content !== undefined"
                >{{ validationError.content }}</CFormFeedback
              >
            </div>
            <div class="mb-3">
              <CFormLabel for="category">Category</CFormLabel>
              <CFormInput
                id="category"
                type="text"
                v-model="post.category"
                v-if="validationError.category !== undefined"
                placeholder="Article category here"
                invalid
              />
              <CFormInput
                id="category"
                type="text"
                v-model="post.category"
                v-if="validationError.category === undefined"
                placeholder="Article category here"
              />
              <CFormFeedback
                invalid
                v-if="validationError.category !== undefined"
                >{{ validationError.category }}</CFormFeedback
              >
            </div>
            <div class="mb-3 d-grid gap-2 d-md-flex justify-content-md-end">
              <CButton color="secondary" @click="setStatus('draft')"
                >Draft</CButton
              >
              <CButton color="success" @click="setStatus('publish')"
                >Publish</CButton
              >
            </div>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import PostService from '../service/PostService'

export default {
  name: 'EditPost',
  data() {
    return {
      id: this.$route.params.id,
      post: {
        title: '',
        content: '',
        category: '',
        status: '',
      },
      success: '',
      validationError: {},
    }
  },

  methods: {
    resetMessage() {
      this.success = ''
    },

    getPost(id) {
      PostService.getPost(id)
        .then((response) => {
          this.post = {
            title: response.data.data.title,
            content: response.data.data.content,
            category: response.data.data.category,
            status: response.data.data.status,
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    setStatus(status) {
      this.post['status'] = status

      PostService.updatePost(this.id, this.post)
        .then((response) => {
          if (response.data.code == 200) {
            this.success = response.data.data
            this.validationError = {}
          } else {
            this.validationError = response.data.data
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },

  mounted() {
    this.getPost(this.id)
  },
}
</script>
