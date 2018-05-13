'use strict'

const showBlogsTemplate = require('../templates/blog.handlebars')
const showMyBlogsTemplate = require('../templates/my-blog.handlebars')
const store = require('../store.js')

const createBlogSuccess = function () {
  $('.status').text('You have successfully created a blog!')
  setTimeout(() => $('.status').text(''), 2000)
  $('#myModalCreateBlog').modal('toggle')
  $('input[type=text]').val('')
}

const createBlogFailure = function () {
  $('.createBlogMessage').text('Failed to create blog! Please try again')
  setTimeout(() => $('.status').text(''), 2000)
}

const getBlogsSuccess = function (data) {
  const getBlogsHTML = showBlogsTemplate({blogs: data.blogs})
  $('.blog-content').html(getBlogsHTML)
  if (data.blogs.length === 0) {
    $('.blog-content').html('<h2>No blogs were found</h2>')
  }
}

const getBlogsFailure = function () {
  $('.status').text('Failed to retrieve blogs. No blogs were found.')
}

const showBlogsSuccess = function (data) {
  console.log('showBlogs data is ', data)
  const getBlogsHTML = showBlogsTemplate({blogs: data.blogs})
  $('.public-blog-content').html(getBlogsHTML)
}

const showBlogsFailure = function () {
  $('.status').text('Failed to retrieve blogs. No blogs were found.')
}

const getPublicBlogsSuccess = function (data) {
  console.log('getMyBlogsSuccess data is ', data)
  const publicBlogs = []
  data.blogs.forEach(function (blog) {
    if (data.owner === blog.owner) {
      publicBlogs.push(blog)
    }
  })
  const getBlogsHTML = showBlogsTemplate({blogs: publicBlogs})
  $('.public-blog-content').html(getBlogsHTML)
  if (publicBlogs.length === 0) {
    $('.public-blog-content').html('<h2>No blogs were found</h2>')
  }
}

const getMyBlogsSuccess = function (data) {
  console.log('getMyBlogsSuccess data is ', data)
  const myBlogs = []
  data.blogs.forEach(function (blog) {
    if (blog.owner === store.user._id) {
      myBlogs.push(blog)
    }
  })
  const getMyBlogsHTML = showMyBlogsTemplate({blogs: myBlogs})
  $('.blog-content').html(getMyBlogsHTML)
  if (myBlogs.length === 0) {
    $('.blog-content').html('<h2>No blogs were found</h2>')
  }
}

const getMyBlogsFailure = function () {
  $('.status').text('Failed to retrieve blogs. No blogs were found.')
}

const getUpdateBlogSuccess = function (blogId) {
  $('.status').text('You have successfully updated a blog!')
  setTimeout(() => $('.status').text(''), 2000)
  const modalName = '#updateModal' + blogId
  $(modalName).modal('toggle')
  $('input[type=text]').val('')
}

const getUpdateBlogFailure = function () {
  $('.status').text('Failed to update blog. Something has gone wrong.')
}

const getDeleteBlogSuccess = function () {
  $('.status').text('You have successfully deleted a blog!')
  setTimeout(() => $('.status').text(''), 2000)
}

const getDeleteBlogFailure = function () {
  $('.status').text('Failed to delete blog. Something has gone wrong.')
}

module.exports = {
  createBlogSuccess,
  createBlogFailure,
  getBlogsSuccess,
  getBlogsFailure,
  showBlogsSuccess,
  showBlogsFailure,
  getPublicBlogsSuccess,
  getMyBlogsSuccess,
  getMyBlogsFailure,
  getUpdateBlogSuccess,
  getUpdateBlogFailure,
  getDeleteBlogSuccess,
  getDeleteBlogFailure
}
