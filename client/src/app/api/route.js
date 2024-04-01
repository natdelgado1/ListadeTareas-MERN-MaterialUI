import axios from "axios";



/* Session Routes */
export function login(data) {
    console.log(data);
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/session`, data, { withCredentials: true });
            const result = await response.data;
            console.log(result);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
/* User */
export function register(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/user`,data, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}