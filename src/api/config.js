import requests from "~/axios";

export function getConfig() {
    return requests({
        url: '/api/admin/config',
        method: 'get',
    })
}

export function setConfig(setting) {
    return requests({
        url: '/api/admin/config',
        method: 'post',
        data: setting
    })
}

export function getDefaultConfig() {
    return requests({
        url: '/api/admin/config',
        method: 'get',
        params: {
            is_default: true
        }
    })
}