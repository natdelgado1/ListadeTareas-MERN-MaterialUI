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

export function passwordResetToken(params = {}) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/user/passwordReset`,
                {
                    params: params,
                    withCredentials: true
                });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function passwordReset(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.patch(`${process.env.REACT_APP_API_DOMAIN}/user/passwordReset`, data,
                {
                    withCredentials: true
                });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//TASK
export function createTask(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_DOMAIN}/tasks`,data);
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function updateTask(id, newTask) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_DOMAIN}/tasks/${id}`,newTask);
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function findAllTasks() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/tasks`);
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}

export function findfilterTask(filters) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/tasks/filter/${filters.date}`);
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}
export function findTask(id) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/task/${id}`);
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

//Actualiza el status 
export function updateStatus(id, newStatus) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_DOMAIN}/tasks/update-status/${id}`, newStatus);
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
//Actualiza la descripción
export function updateDescription(id, newDescription) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_DOMAIN}/tasks/update-description/${id}`, newDescription);
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}

export function findfilterTaskStatusinPending(filters) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/tasks/filter/${filters.date}/pending`, { withCredentials: true });
            const result = await response.data;
            resolve(result);
        } catch (error) {
            console.log(error);
            reject(error)
        }
    })
}