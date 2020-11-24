export const baseUrl = 'http://localhost:8080/'
export const authUrls = {
    signIn: baseUrl + 'auth/signin',
    signUp: baseUrl + 'auth/signup',
    getUser: baseUrl + 'auth/getUser',
}

export const productUrls = {
    getAllProducts: baseUrl + 'products/getproducts',
    addProduct: baseUrl + 'products/addproduct',
    getSingleProduct: baseUrl + 'products/getsingleproduct/',
    updateProduct: baseUrl + 'products/addproduct/',
    deleteProduct: baseUrl + 'products/deleteproduct/',
    placeOrder: baseUrl + 'products/addorder/',
    getOrders: baseUrl + 'products/getorders',
    changeOrderStatus: baseUrl + 'products/updateorderstatus/',
    deleteOrder: baseUrl + 'products/deleteorder/',
}