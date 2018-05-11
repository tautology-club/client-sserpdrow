'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreateBlog = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createBlog(data)
    .then(ui.createBlogSuccess)
    .then(() => onGetMyBlogs(event))
    .catch(ui.createBlogFailure)
}

const onGetBlogs = (event) => {
  event.preventDefault()
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
  const blogId = $(event.target).closest('ul').attr('data-id')
  console.log(blogId)
  api.updateBlogs(data, blogId)
    .then(ui.getUpdateBlogSuccess)
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
  $('#blog-load').on('click', function () {
    $('#all-page-content').addClass('hidden')
    $('#all-blog-content').removeClass('hidden')
  })
  $('.blog-content').on('submit', '.update-blog', onUpdateBlogs)
  $('.blog-content').on('click', '.destroy-id', onDeleteBlog)
}

module.exports = {
  addHandlers,
  onGetBlogs
}
