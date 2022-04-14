/* eslint-disable prettier/prettier */
<template>
  <CPagination>
    <CPaginationItem @click="onClickPreviousPage()" :disabled="isInFirstPage"
      >Previous</CPaginationItem
    >
    <CPaginationItem
      @click="onClickPage(page.name)"
      v-for="page in pages"
      :key="page.id"
      :active="isPageActive(page.name)"
      >{{ page.name }}</CPaginationItem
    >
    <CPaginationItem @click="onClickNextPage()" :disabled="isInLastPage"
      >Next</CPaginationItem
    >
  </CPagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1
    },
    isInLastPage() {
      if (this.totalPages === 0) {
        return true
      }
      return this.currentPage === this.totalPages
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1
      }
      if (this.totalPages < this.maxVisibleButtons) {
        return 1
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1
      }
      return this.currentPage - 1
    },
    endPage() {
      if (this.totalPages === 0) {
        return 1
      }
      if (this.totalPages < this.maxVisibleButtons) {
        return this.totalPages
      }
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages,
      )
    },
    pages() {
      const range = []
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        })
      }
      return range
    },
  },
  methods: {
    onClickPreviousPage() {
      if (this.isInFirstPage) {
        return false
      }
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      if (this.isInLastPage) {
        return false
      }
      this.$emit('pagechanged', this.currentPage + 1)
    },
    isPageActive(page) {
      return this.currentPage === page
    },
  },
}
</script>

<style scoped>
li.page-item:hover {
  cursor: pointer !important;
}
</style>
