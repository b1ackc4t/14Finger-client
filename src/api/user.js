import requests from "~/axios";

export function register(data) {
    return requests({
        url: '/api/user',
        method: 'post',
        data: data
    })
}

export function login(data) {
    return requests({
        url: '/api/user/login',
        method: 'post',
        data: data
    })
}

export function getMe() {
    return requests({
        url: '/api/user',
        method: 'get',
    })
}

export function logout() {
    return requests({
        url: '/api/user/logout',
        method: 'get',
    })
}

export function getUserRank() {
    return requests({
        url: '/api/user/rank',
        method: 'get',
    })
}

export function getUserPageForAdmin(pageSize, pageNum, searchInfo) {
    return requests({
        url: '/api/admin/user',
        method: 'get',
        params: {
            page: pageNum,
            size: pageSize,
            key: searchInfo.key,
            value: searchInfo.value
        }
    })
}


export function getUser(id) {
    return requests({
        url: '/api/admin/user',
        method: 'get',
        params: {
            id:id
        }
    })
}

export function updateUser(user) {
    return requests({
        url: '/api/admin/user',
        method: 'post',
        data: user
    })
}

export function deleteUser(id) {
    return requests({
        url: '/api/admin/user',
        method: 'delete',
        params: {
            id: id
        }
    })
}