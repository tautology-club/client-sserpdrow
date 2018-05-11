'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const clearContent = () => {
  $('.public-page-content').empty()
}

const onCreateBlog = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createBlog(data)
    .then(ui.createBlogSuccess)
    .then(() => onGetMyBlogs(event))
    .catch(ui.createBlogFailure)
}

const onShowBlogs = (event) => {
  event.preventDefault()
  api.showAllBlogs()
    .then(ui.showBlogsSuccess)
    .then(clearContent)
    .catch(ui.showBlogsFailure)
}

const onGetBlogs = (event) => {
  if (event) {
    event.preventDefault()
  }
  api.getBlogs()
    .then(ui.getBlogsSuccess)
    .catch(ui.getBlogsFailure)
}

const onGetMyBlogs = (event) => {
  event.preventDefault()
  api.getBlogs()
    .then(ui.getMyBlogsSuccess)
    .catch(ui.getMyBlogsFailure)
}

const onUpdateBlogs = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const blogId = $(event.target).data('id')
  api.updateBlogs(data, blogId)
    .then(ui.getUpdateBlogSuccess(blogId))
    .then(() => onGetMyBlogs(event))
    .catch(ui.getUpdateBlogFailure)
}

const onDeleteBlog = (event) => {
  event.preventDefault()
  const blogId = $(event.target).closest('ul').attr('data-id')
  api.deleteBlog(blogId)
    .then(ui.getDeleteBlogSuccess)
    .then(() => onGetMyBlogs(event))
    .catch(ui.getDeleteBlogFailure)
}

const addHandlers = () => {
  $('#create-blog').on('submit', onCreateBlog)
  $('#getBlogs').on('click', onGetBlogs)
  $('#getMyBlogs').on('click', onGetMyBlogs)
  $('#public-blog-load').on('click', onShowBlogs)
  // $('#blog-load').on('click', on)
  $('#blog-load').on('click', function () {
    $('#all-page-content').addClass('hidden')
    $('#all-blog-content').removeClass('hidden')
    onGetBlogs()
  })
  $('.blog-content').on('submit', '.update-blog', onUpdateBlogs)
  $('.blog-content').on('click', '.destroy-id', onDeleteBlog)
}

module.exports = {
  addHandlers,
  onGetBlogs
}
