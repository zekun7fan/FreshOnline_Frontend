import {User} from "../net/reqBody";

export const user_token_key = "token"
export const user_id_key = "id"
export const user_type_key = "type"
export const user_name_key = "name"



export enum UserType {
    CUSTOMER=0,
    ADMINISTRATOR=1
}


export function getUserId(): number | null {
    const uid: string | null = localStorage.getItem(user_id_key);
    return uid !== null ? parseInt(uid) : null;
}

export function getUserType(): UserType | null {
    const utype = localStorage.getItem(user_type_key);
    if (utype === null){
        return null;
    }
    const userType = parseInt(utype)
    if (userType === 0){
        return UserType.CUSTOMER;
    }else{
        return UserType.ADMINISTRATOR;
    }
}

export function getUserToken(): string | null {
    return localStorage.getItem(user_token_key);
}


export function getUserName(): string| null {
    return  localStorage.getItem(user_name_key)
}


export function getUserInfo(): User | null{
    const id = localStorage.getItem(user_id_key)
    if (id == null){
        return  null;
    }
    return {
        id: parseInt(id),
        name: localStorage.getItem(user_name_key) as string,
        type: parseInt(localStorage.getItem(user_type_key) as string),
    }
}

