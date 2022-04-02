


export const categoryTree = '/categoryTree'

export const goodsById = (id: number): string => {
    return `/goods/${id}`
};

export const goods = '/goods'

export const category = '/category'

export const paymentMethodByUserId = (userId: number): string => {
    return `/paymentMethod/${userId}`
};

export const paymentMethodByPid = (pid: number): string => {
    return `/paymentMethod/${pid}`
};

export const paymentMethodUrl = '/paymentMethod'

export const loginUrl = '/toLogin'

export const registerUrl = '/toRegister'

export const logoutUrl = '/toLogout'

export const cartUrl = '/cart'

export const goodsDetailsUrl = '/goodsdetails'

export const favoriteUrl = '/favourite'

export const goodsPictureUrl = (id: number) => {
    return `/goods/picture/${id}`
};