import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    crossDomain: true,
    mode: 'no-cors',
    headers: {
        'Access-Control-AllowOrigin': '*',
        "Content-Type": "multipart/form-data",
        contentType: false,
        processData: false,
        data: 'form',
        dataType: "json",

    },
    baseURL: 'https://uxcandy.com/~shapoval/test-task-backend/v2/',
});

export const authAPI = {
    authentication(form) {
        const formData = new FormData()
        const {username, password} = form;
        formData.append("username", username);
        formData.append("password", password);
        return axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=Altunin', formData).then(response => response.data);
    },
};


export const tasksAPI = {
    getTasks() {
        return axios.get('https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Altunin').then(response => response.data);
        //return instance.get('create?developer=Altunin').then(response => response.data);
    },
    createTask(form) {
        const {username, email, text} = form;
        const formData = new FormData()
        formData.append("username", username);
        formData.append("email", email);
        formData.append("text", text);

        return axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Altunin', 
        formData).then(response => response.data);
    },
    getTasksByPageNumber(num) {
        return axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Altunin&page=${num}`).then(response => response.data);
    }
};

export const editingTaskAPI = {
    editingTask(form) {
        const {token, text, status, id} = form;
        const formData = new FormData()
        formData.append("token", token);
        formData.append("text", text);
        formData.append("status", status);

        return axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=Altunin`, 
        formData).then(response => response.data);
    }
}
