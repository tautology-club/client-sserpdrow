'use strict'

const showPagesTemplate = require('../templates/page.handlebars')
const showMyPagesTemplate = require('../templates/my-page.handlebars')
const store = require('../store.js')

const createPageSuccess = function () {
  $('.status').text('You have successfully created a page!')
  setTimeout(() => $('.status').text(''), 2000)
  $('#myModalCreatePage').modal('toggle')
  $('input[type=text]').val('')
}

const createPageFailure = function () {
  $('.createPageMessage').text('Failed to create page! Please try again')
  setTimeout(() => $('.status').text(''), 2000)
}

const getPagesSuccess = function (data) {
  const getPagesHTML = showPagesTemplate({pages: data.pages})
  $('.page-content').html(getPagesHTML)
  if (data.pages.length === 0) {
    $('.page-content').html('<h2>No pages were found</h2>')
  }
}

const getPagesFailure = function () {
}

const getMyPagesSuccess = function (data) {
  const myPages = []
  data.pages.forEach(function (page) {
    if (page.owner === store.user._id) {
      myPages.push(page)
    }
  })
  const getMyPagesHTML = showMyPagesTemplate({pages: myPages})
  $('.page-content').html(getMyPagesHTML)
  if (myPages.length === 0) {
    $('.page-content').html('<h2>No pages were found</h2>')
  }
}

const getMyPagesFailure = function () {
}

const getUpdatePageSuccess = function (data) {
  $('.status').text('You have successfully updated a page!')
  setTimeout(() => $('.status').text(''), 2000)
  $('#updateModal').modal('toggle')
  $('input[type=text]').val('')
}

const getUpdatePageFailure = function () {
}

const getDeletePageSuccess = function () {
  $('.status').text('You have successfully deleted a page!')
  setTimeout(() => $('.status').text(''), 2000)
}

const getDeletePageFailure = function () {
}

module.exports = {
  createPageSuccess,
  createPageFailure,
  getPagesSuccess,
  getPagesFailure,
  getMyPagesSuccess,
  getMyPagesFailure,
  getUpdatePageSuccess,
  getUpdatePageFailure,
  getDeletePageSuccess,
  getDeletePageFailure
}
