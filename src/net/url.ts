


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

export const loginUrl = '/login'

export const registerUrl = '/register'