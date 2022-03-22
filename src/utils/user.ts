
const user_token_key = "token"
const user_id_key = "id"
const user_type_key = "type"



enum UserType {
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