import * as axios from "axios";

const  baseURL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'

const getUrlParameter = (num, filterName) => {
    const parametrsUrl = {
        'по @email': `&sort_field=email&page=${num}`,
        'по имени': `&sort_field=username&page=${num}`,
        'по статусу': `&sort_field=status&page=${num}`,
        'общие': `&page=${num}`,
    }
    return parametrsUrl[filterName]
}

export const authAPI = {
    authentication(form) {
        const formData = new FormData()
        const { username, password } = form;
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
        const { username, email, text } = form;
        const formData = new FormData()
        formData.append("username", username);
        formData.append("email", email);
        formData.append("text", text);

        return axios.post('https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=Altunin',
            formData).then(response => response.data);
    },
    getTasksByPageNumberEndFilter(num, filterName) {
        const urlParametr = getUrlParameter(num, filterName)
        return axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=Altunin${urlParametr}`).then(response => response.data);
    }
};

export const editingTaskAPI = {
    editingTask(form) {
        const { token, text, status, id } = form;
        const formData = new FormData()
        formData.append("token", token);
        formData.append("text", text);
        formData.append("status", status);

        return axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${id}?developer=Altunin`,
            formData).then(response => response.data);
    }
}
