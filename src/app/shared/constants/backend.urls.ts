// export const baseUrl = 'http://localhost:8080/'
export const baseUrl = 'https://general-shop-fahim.herokuapp.com/';

export const authUrls = {
    signIn: baseUrl + 'auth/signin',
    signUp: baseUrl + 'auth/signup',
    getUser: baseUrl + 'auth/getUser',
}

export const productUrls = {
    getAllProducts: baseUrl + 'products/getProducts',
    getFeaturedProducts: baseUrl + 'products/getFeaturedProducts',
    addProduct: baseUrl + 'products/addProduct',
    getSingleProduct: baseUrl + 'products/getSingleProduct/',
    updateProduct: baseUrl + 'products/updateProduct/',
    deleteProduct: baseUrl + 'products/deleteProduct/',
    placeOrder: baseUrl + 'orders/addOrder/',
    getOrders: baseUrl + 'orders/getOrders',
    changeOrderStatus: baseUrl + 'orders/updateOrderStatus/',
    deleteOrder: baseUrl + 'orders/deleteOrder/',
    myOrders: baseUrl + 'orders/myOrders/',
}

export const settingsUrls = {
    getCoverPhotos: baseUrl + 'settings/coverPhotos',
    addCoverPhotos: baseUrl + 'settings/addCoverPhotos',
}