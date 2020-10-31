export const baseUrl = 'http://localhost:8080/'
export const authUrls = {
    signIn: baseUrl + 'auth/signin',
    signUp: baseUrl + 'auth/signup',
    getUser: baseUrl + 'auth/getUser',
}

export const productUrls = {
    getAllProducts: baseUrl + 'products/getproducts',
    addProduct: baseUrl + 'products/addproduct',
}