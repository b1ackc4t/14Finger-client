import requests from "~/axios";

export function getSimpleFingerPage(pageSize, pageNum, searchInfo) {
    return requests({
        url: '/api/finger',
        method: 'get',
        params: {
            page: pageNum,
            size: pageSize,
            app_type: searchInfo.app_type,
            key: searchInfo.key,
            value: searchInfo.value
        }
    })
}

export function saveFinger(data, param_str) {
    return requests({
        url: `/api/finger/single?${param_str}`,
        method: 'post',
        data: data,
    })
}


export function saveFingerSuper(data, param_str) {
    return requests({
        url: `/api/admin/finger/supersubmit?${param_str}`,
        method: 'post',
        data: data,
    })
}

export function checkFinger(data) {
    return requests({
        url: '/api/finger/single/check',
        method: 'post',
        data: data,
    })
}

export function querySingleFinger(url, setting) {
    let form = new FormData()
    form.append("url", url)
    form.append("setting", JSON.stringify(setting))
    return requests({
        url: '/api/finger/single/query',
        method: 'post',
        data: form,
    })
}

export function queryBatchFinger(urls, setting) {
    let form = new FormData()
    form.append("urls", urls)
    form.append("setting", JSON.stringify(setting))
    return requests({
        url: '/api/finger/batch/query',
        method: 'post',
        data: form,
    })
}

export function getBatchTask(pageSize, pageNum) {
    return requests({
        url: '/api/finger/batch/query',
        method: 'get',
        params: {
            page: pageNum,
            size: pageSize,
        }
    })
}

export function downloadBatchTask(id) {
    window.location.href = `${requests.defaults.baseURL}/api/finger/batch/action?id=${id}`
}

export function deleteBatchTask(id) {
    return requests({
        url: '/api/finger/batch/action',
        method: 'delete',
        params: {
            id: id
        }
    })
}

export function getFingerPageForAdmin(pageSize, pageNum, searchInfo) {
    return requests({
        url: '/api/admin/finger',
        method: 'get',
        params: {
            page: pageNum,
            size: pageSize,
            app_type: searchInfo.app_type,
            key: searchInfo.key,
            value: searchInfo.value
        }
    })
}

export function actionFingerForAdmin(action, id) {
    let form = new FormData()
    form.append("action", action)
    form.append("id", id)
    return requests({
        url: '/api/admin/finger',
        method: 'post',
        data: form,
    })
}

export function getFingerForAdmin(id) {
    return requests({
        url: '/api/admin/finger/single',
        method: 'get',
        params: {
            id: id,
        }
    })
}

export function updateFinger(id, data) {
    return requests({
        url: `/api/admin/finger/single?id=${id}`,
        method: 'post',
        data: data,
    })
}

export function modifySingleFinger(id, app_id, fac_id) {
    let form = new FormData()
    form.append("id", id)
    form.append("app_id", app_id)
    form.append("fac_id", fac_id)
    return requests({
        url: '/api/admin/finger/modify',
        method: 'post',
        data: form,
    })
}
