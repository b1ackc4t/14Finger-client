import requests from "~/axios";

export function getAllFactory() {
    return requests({
        url: '/api/factory',
        method: 'get',
    })
}