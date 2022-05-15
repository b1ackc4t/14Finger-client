import axios from 'axios'

const requests = axios.create({
    baseURL: "",
    timeout: 900000, // 15分钟的超时时间
    withCredentials: true
})

export default requests