import {inject, onMounted, ref} from "vue";

export function getMessage() {
    /**
     * 返回响应式的Message对象
     * @type {null}
     */
    const message = ref(null)
    onMounted(() => {
        message.value = inject("message")
    })
    return message
}

export function timeFormat(date) {
    var dateTime = new Date(date);
    var no1new = dateTime.valueOf();
    // var year = dateTime.getFullYear();
    // var month = dateTime.getMonth() + 1;
    // var day = dateTime.getDate();
    // var hour = dateTime.getHours();
    // var minute = dateTime.getMinutes();
    // var second = dateTime.getSeconds();
    var now = new Date();
    var now_new = now.valueOf();
    var milliseconds = 0;
    var timeSpanStr;

    milliseconds = now_new - no1new;

    if (milliseconds <= 1000 * 60 * 1) {
        timeSpanStr = '刚刚';
    }else if (1000 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60) {
        timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    }else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 30) {
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    }else if (milliseconds > 1000 * 60 * 60 * 24 * 30 && milliseconds <= 1000 * 60 * 60 * 24 * 30 * 12) {
        // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 30)) + '月前';
    }else {
        // timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
        timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24 * 30 * 12)) + '年前';
    }

    return timeSpanStr;
    // return new Date(json_date).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

}

export function timeFormat2(seconds) {
    if (seconds < 60) {
        return seconds + '秒'
    }else if (60 <= seconds && seconds < 60 * 60) {
        return  Math.round((seconds * 100 / 60))/100 + '分钟';
    }else  {
        return Math.round((seconds * 100 / (60 * 60)))/100 + '小时';
    }
}