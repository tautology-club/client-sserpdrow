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
  console.log('getPagesSuccess data is ', data)
  const getPagesHTML = showPagesTemplate({pages: data.pages})
  $('.page-content').html(getPagesHTML)
  if (data.pages.length === 0) {
    $('.page-content').html('<h2>No pages were found</h2>')
  }
}

const getPagesFailure = function () {
  $('.status').text('Failed to retrieve pages. No pages were found.')
}

const showPagesSuccess = function (data) {
  console.log('showPagesSuccess data is ', data)
  const getPagesHTML = showPagesTemplate({pages: data.pages})
  $('.public-page-content').html(getPagesHTML)
}

const showPagesFailure = function () {
  $('.status').text('Failed to retrieve Pages. No pages were found.')
}

const getMyPagesSuccess = function (data) {
  console.log('getMyPagesSuccess data is ', data)
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
  $('.status').text('Failed to retrieve pages. No pages were found.')
}

const getUpdatePageSuccess = function (pageId) {
  $('.status').text('You have successfully updated a page!')
  setTimeout(() => $('.status').text(''), 2000)
  const modalName = '#updateModal' + pageId
  $(modalName).modal('toggle')
  $('input[type=text]').val('')
}

const getUpdatePageFailure = function () {
  $('.status').text('Failed to update page. Something has gone wrong.')
}

const getDeletePageSuccess = function () {
  $('.status').text('You have successfully deleted a page!')
  setTimeout(() => $('.status').text(''), 2000)
}

const getDeletePageFailure = function () {
  $('.status').text('Failed to delete page. Something has gone wrong.')
}

module.exports = {
  createPageSuccess,
  createPageFailure,
  getPagesSuccess,
  getPagesFailure,
  showPagesSuccess,
  showPagesFailure,
  getMyPagesSuccess,
  getMyPagesFailure,
  getUpdatePageSuccess,
  getUpdatePageFailure,
  getDeletePageSuccess,
  getDeletePageFailure
}
