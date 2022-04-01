import axios, {AxiosRequestHeaders} from "axios";
import { createBrowserHistory } from "history";
import {ReqParam} from "./reqParam";
import {ReqBody} from "./reqBody";
import {user_token_key} from "../utils/user";
import {Resp} from "./resp";


axios.defaults.withCredentials = true;
const baseURL = 'http://localhost:8080'
axios.defaults.baseURL = baseURL

const history = createBrowserHistory();


axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem(user_token_key)
        if (token != null){
            const oldHeader: AxiosRequestHeaders = config.headers as AxiosRequestHeaders
            config.headers = {...oldHeader, "token": token,"Access-Control-Allow-Origin":baseURL}
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)


axios.interceptors.response.use(
    function (response) {
        const token = response.headers[user_token_key]
        if (token != null) {
            localStorage.setItem(user_token_key, token)
        }
        return response
    },
    function (error) {
        const status = error.response?.status
        switch (status) {
            case 401:
                const res: Resp = error.response.data as Resp
                const {code} = res
                switch (code) {
                    case -2:
                        history.replace("/login");
                        break
                    case -3:
                        history.replace("/home");
                        break;
                }
                break;
            default:
                history.replace("/error");
                break;
        }
        return Promise.reject(error);
    })


export function toQueryString(param: any = {}): string {
    let paramStr: string = ''
    for (let key in param) {
        paramStr += key + '=' + param[key] + '&'
    }
    if (paramStr) {
        paramStr = '?' + paramStr.substring(0, paramStr.length - 1)
    }
    return paramStr
}


export function get(url: string, param: ReqParam = {}) {
    return axios.get(url + toQueryString(param))
}

export function post(url: string, param: ReqParam = {}, data: ReqBody = {}) {
    return axios.post(url + toQueryString(param), data)
}

export function put(url: string, param: ReqParam = {}, data: ReqBody = {}) {
    return axios.put(url + toQueryString(param), data)
}

export function del(url: string, param: ReqParam = {}, data: ReqBody = {}) {
    return axios.delete(url + toQueryString(param), {data})
}






