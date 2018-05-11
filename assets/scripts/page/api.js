'use strict'

const config = require('../config.js')
const store = require('../store.js')

const createPage = function (data) {
  data.user = store.user
  return $.ajax({
    url: config.apiUrl + '/pages',
    method: 'POST',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const showAllPages = function () {
  return $.ajax({
    url: config.apiUrl + '/pages',
    method: 'GET',
    headers: {
      contentType: 'application/json'
    }
  })
}

const getPages = function () {
  return $.ajax({
    url: config.apiUrl + '/pages',
    method: 'GET',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePages = function (data, pageId) {
  return $.ajax({
    url: config.apiUrl + '/pages/' + pageId,
    method: 'PATCH',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const deletePage = function (pageId) {
  return $.ajax({
    url: config.apiUrl + '/pages/' + pageId,
    method: 'DELETE',
    headers: {
      contentType: 'application/json',
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createPage,
  getPages,
  showAllPages,
  updatePages,
  deletePage
}
