const axios = require('axios')
import  { ToastPlugin } from 'vux'
import Vue from "vue";
Vue.use(ToastPlugin)

const instance = axios.create({
    baseURL: '',
    timeout: 60000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
})

// 请求拦截器
instance.interceptors.request.use(
    config => {

        return config;
    },
    error => {
        Vue.$vux.toast.text('请求出错')
        return Promise.reject(error);
    })

// 响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.code === 200) {
            return response.data
        } else {
            Vue.$vux.toast.text(response.msg || '系统错误')
            return Promise.reject(response)
        }
}, error => {
    Vue.$vux.toast.text(error.message || '请求失败')
    return Promise.reject(error);
})

export default instance
