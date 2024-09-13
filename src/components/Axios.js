import axios from 'axios';

// Axios instance for custom_auth app
const authAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/custom_auth',
    timeout: 500000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});


const baseUrl = 'http://127.0.0.1:8000/api';
const AxiosInstance = axios.create({
    baseURL: baseUrl, // Note: baseURL should be camelCase
    timeout: 500000,    // Note: timeout should be camelCase
    headers: {
        "Content-Type": "application/json",  // Header keys should be capitalized correctly
        "Accept": "application/json"
    }
});


AxiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('Token')
        if(token){
            config.headers.Authorization = `Token ${token}`
        }
        else{
            config.headers.Authorization = ``
        }
        return config;
    }
)


AxiosInstance.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if(error.response && error.response.status === 401){
            localStorage.removeItem('Token')
        }

    }
)

// export default AxiosInstance;
export {AxiosInstance, authAxios} ;




// import axios from 'axios'

// const baseUrl = 'http://127.0.0.1:8000/'

// const AxiosInstance = axios.create({
//     baseURL: baseUrl,
//     timeout: 5000, 
//     headers:{
//         "Content-Type":"application/json",
//          accept: "application/json"
//     }
// })

// AxiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('Token')
//         if(token){
//             config.headers.Authorization = `Token ${token}`
//         }
//         else{
//             config.headers.Authorization = ``
//         }
//         return config;
//     }
// )

// AxiosInstance.interceptors.response.use(
//     (response) => {
//         return response
//     }, 
//     (error) => {
//         if(error.response && error.response.status === 401){
//             localStorage.removeItem('Token')
//         }

//     }
// )

// export default AxiosInstance;