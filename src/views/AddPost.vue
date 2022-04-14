<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Add New Post Article</strong>
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
                v-if="validationError.title !== undefined"
                v-model="post.title"
                placeholder="Article title here"
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
  name: 'AddPost',
  data() {
    return {
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

    setStatus(status) {
      this.post.status = status

      PostService.storePost(this.post)
        .then((response) => {
          if (response.data.code == 201) {
            this.success = response.data.data
            this.post = {
              title: '',
              content: '',
              category: '',
              status: '',
            }
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
}
</script>
