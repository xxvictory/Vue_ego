import axios from "axios"
import qs from "query-string"
import store from "../store"

// 创建实例
const instance = axios.create({
    timeout:5000
})

// https://www.cnblogs.com/lyraLee/p/11588417.html

const errroHandle = (status,ohter) =>{
    switch(status){
        case 400:
            console.log("请求语法有问题，服务器无法识别");
            break;
        case 401:
            console.log("客户端未授权该请求。缺乏有效的身份认证凭证");
            break;
        case 403:
            console.log("服务器拒绝响应。权限不足");
            break;
        case 404:
            console.log("URL无效或者URL有效但是没有资源");
            break;
        default:
            console.log(ohter);
            break;
    }
}


// 全局配置
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截和响应拦截
instance.interceptors.request.use(config =>{
    // post请求的处理
    if(config.method === "post"){
        config.data = qs.stringify(config.data);
    }
    if(store.state.LoginModule.token){
        config.headers.Authorization = store.state.LoginModule.token;
    }
    return config;
},error => Promise.reject(error))

instance.interceptors.response.use(
    /**
     * 网络请求成功和失败
     * 返回的数据的成功和失败
     */
    response => response.status === 200 ? Promise.resolve(response) : Promise.reject(response),
    error =>{
        const { response } = error;
        if(response){
            // 响应状态码:400 401 402  500 501 502
            errroHandle(response.status,errroHandle.data)
            return Promise.reject(response)
        }else{
            console.log("网络请求被中断");
        }
    }
)

export default instance

// 面向对象：低耦合 高内聚