import Single from '../utils/Single'
import buildRequest from '../utils/buildRequest'

function BuildRequest (config) {
  return new Single(config, buildRequest)
}

export const ajaxGetSocrateCarInfo = BuildRequest({
  url: '/path/get_socrate_car_info',
  method: 'POST'
})

export const ajaxGetProjectList = BuildRequest({
  url: '/path/timo_get_project_list',
  method: 'POST'
})

export const ajaxUpdateProjectList = BuildRequest({
  url: '/path/timo_update_project_list',
  method: 'POST'
})

export const ajaxGetEditingList = BuildRequest({
  url: '/path/timo_get_editing_list',
  method: 'POST'
})

export const ajaxUpdateEditingList = BuildRequest({
  url: '/path/timo_update_editing_list',
  method: 'POST'
})

export const ajaxGetMaterialList = BuildRequest({
  url: '/path/timo_get_material_list',
  method: 'POST'
})

export const ajaxUpdateMaterialList = BuildRequest({
  url: '/path/timo_update_material_list',
  method: 'POST'
})

export const ajaxGetIssueList = BuildRequest({
  url: '/path/timo_get_issue_list',
  method: 'POST'
})

export const ajaxUpdateIssueList = BuildRequest({
  url: '/path/timo_update_issue_list',
  method: 'POST'
})

export const ajaxGetTimoConfig = BuildRequest({
  url: '/path/timo_get_config',
  method: 'POST'
})

export const ajaxUpdateTimoConfig = BuildRequest({
  url: '/path/timo_update_config',
  method: 'POST'
})

export const ajaxGetTimoHealthz = BuildRequest({
  url: '/path/timo_get_healthz',
  method: 'POST'
})

export const ajaxUpdateTimoHealthz = BuildRequest({
  url: '/path/timo_update_healthz',
  method: 'POST'
})

export const ajaxGetTimoAuthority = BuildRequest({
  url: '/path/timo_get_authority_list',
  method: 'POST'
})

export const ajaxUpdateTimoAuthority = BuildRequest({
  url: '/path/timo_update_authority_list',
  method: 'POST'
})

export const ajaxGetUserInfo = BuildRequest({
  url: '/path/timo_get_user_info',
  method: 'POST'
})

export const ajaxGetMarioArticleList = BuildRequest({
  url: '/path/timo_get_mario_article_list',
  method: 'POST'
})

export const ajaxGetAllMember = BuildRequest({
  url: '/path/timo_get_all_member',
  method: 'POST'
})

export const ajaxGetFunc = BuildRequest({
  url: '/func',
  method: 'GET'
})

export const ajaxPostFunc = BuildRequest({
  url: '/save',
  method: 'POST'
})

export const ajaxRunFunc = BuildRequest({
  url: '/run/{id}',
  method: 'POST'
})
