import axios from 'axios'
export function request(config) {
    const instance = axios.create({
        baseURL: 'http://152.136.185.210:7878/api/m5',
        timeout: 5000
    })

    // 请求拦截器
    instance.interceptors.request.use(config => {
        // 为config添加参数、或者显示动画一类的操作在这里进行
        return config; // 必须返回config，否则将被拦截，请求失败
    }, err => {
        console.log(err);
    })

    // 响应拦截器
    instance.interceptors.response.use(res => {
        return res.data;
    }, err => {

    })
    return instance(config);
}