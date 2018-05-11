'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onCreatePage = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createPage(data)
    .then(ui.createPageSuccess)
    .then(() => onGetMyPages(event))
    .catch(ui.createPageFailure)
}

const onGetPages = (event) => {
  event.preventDefault()
  api.getPages()
    .then(ui.getPagesSuccess)
    .catch(ui.getPagesFailure)
}

const onShowPages = () => {
  // event.preventDefault()
  api.showAllPages()
    .then(ui.showPagesSuccess)
    .catch(ui.showPagesFailure)
}

const onGetMyPages = (event) => {
  event.preventDefault()
  api.getPages()
    .then(ui.getMyPagesSuccess)
    .catch(ui.getMyPagesFailure)
}

const onUpdatePages = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  const pageId = $(event.target).data('id')
  api.updatePages(data, pageId)
    .then(ui.getUpdatePageSuccess(pageId))
    .then(() => onGetMyPages(event))
    .catch(ui.getUpdatePageFailure)
}

const onDeletePage = (event) => {
  event.preventDefault()
  const pageId = $(event.target).closest('ul').attr('data-id')
  api.deletePage(pageId)
    .then(ui.getDeletePageSuccess)
    .then(() => onGetMyPages(event))
    .catch(ui.getDeletePageFailure)
}

const addHandlers = () => {
  $('#create-page').on('submit', onCreatePage)
  $('#getPages').on('click', onGetPages)
  $('#getMyPages').on('click', onGetMyPages)
  $('#public-page-load').on('click', onShowPages)
  $('#page-load').on('click', function () {
    $('#all-blog-content').addClass('hidden')
    $('#all-page-content').removeClass('hidden')
  })
  $('.page-content').on('submit', '.update-page', onUpdatePages)
  $('.page-content').on('click', '.destroy-id', onDeletePage)
}

module.exports = {
  addHandlers,
  onGetPages,
  onShowPages
}
