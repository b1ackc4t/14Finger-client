const handleCheckUrls = function (form) {
    if (form.checkUrls == null || form.checkUrls.size === 0) {
        form.checkUrls = [
            {
                value: ''
            }
        ]
    }
}

export {handleCheckUrls}

/**
 * 把远程指纹格式转化成本地格式
 * @param finger
 */
export function finger2local(finger) {

}

/**
 * 把本地的表单数据转换为指纹格式
 * @param data
 * @returns {string}
 */
export function local2finger(data) {

    let factory_id = null
    let param_str = ''
    if (!data.app.factory.is_new) {
        factory_id = data.app.factory.factory_id
        delete data.app.factory
        param_str = 'factory_id=' + factory_id
    }
    if (!data.app.is_new) {
        param_str = 'app_id=' + data.app.app_id
        delete data.app
    }
    return param_str
}
