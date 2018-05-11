'use strict'

const config = require('../config.js')
const store = require('../store.js')

const createBlog = function (data) {
  data.user = store.user
  return $.ajax({
    url: config.apiUrl + '/blogs',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getBlogs = function () {
  return $.ajax({
    url: config.apiUrl + '/blogs',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateBlogs = function (data, blogId) {
  return $.ajax({
    url: config.apiUrl + '/blogs/' + blogId,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deleteBlog = function (blogId) {
  return $.ajax({
    url: config.apiUrl + '/blogs/' + blogId,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createBlog,
  getBlogs,
  updateBlogs,
  deleteBlog
}
