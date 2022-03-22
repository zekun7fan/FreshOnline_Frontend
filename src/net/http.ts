import axios from "axios";
import {ReqParam} from "./reqParam";
import {ReqBody} from "./reqBody";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8080'



// axios.interceptors.request.use(
//     function (config) {
//         const token = localStorage.getItem(user_token_key)
//         if (token != null){
//             config.headers = {user_token_key : token}
//         }
//         return config
//     },
//     function (error) {
//         return Promise.reject(error)
//     }
// )
//
//
// axios.interceptors.response.use(
//     function (response) {
//         const token = response.headers[user_token_key]
//         if (token != null){
//             localStorage.setItem(user_token_key, token)
//         }
//         return response
//     },
//     function (error) {
//         const status = error.response?.status
//         switch (status) {
//             case 401:
//                 const res = error.response.data
//                 const {code, msg} = res
//                 switch (code) {
//                     case to_login: history.replace("/login",{msg});break
//                     case to_homepage: history.replace("/home", {msg});break;
//                 }
//                 break;
//             default: history.replace("/error");break;
//         }
//         return Promise.reject(error);
//     })


function toQueryString(param: any = {}) : string {
    let paramStr: string = ''
    for (let key in param){
        paramStr += key + '=' + param[key] + '&'
    }
    // Object.keys(param).forEach(key => {
    //     paramStr += key + '=' + param[key] + '&'
    // })
    if (paramStr) {
        paramStr = '?' + paramStr.substring(0, paramStr.length - 1)
    }
    return paramStr
}


export function get(url: string, param: ReqParam = {}) {
    return axios.get(url + toQueryString(param))
}

export function post(url: string,param: ReqParam = {}, data: ReqBody = {}) {
    return axios.post(url + toQueryString(param), data)
}

export function put(url: string, param: ReqParam = {}, data: ReqBody = {}) {
    return axios.put(url + toQueryString(param), data)
}

export function del(url: string, param: ReqParam = {}, data: ReqBody = {}) {
    return axios.delete(url + toQueryString(param), {data})
}






