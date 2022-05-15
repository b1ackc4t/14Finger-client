import requests from "~/axios";

export function getAllApp() {
    return requests({
        url: '/api/app',
        method: 'get',
    })
}