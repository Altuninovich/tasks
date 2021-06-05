import * as axios from "axios";

const baseURL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/'

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
        try {
        const formData = new FormData()
        const { username, password } = form;
        formData.append("username", username);
        formData.append("password", password);
        return axios.post(`${baseURL}login?developer=Altunin`, formData).then(response => response.data);
        } catch (e) {
            throw e
        }
    },
};

export const tasksAPI = {
    getTasks() {
        try {
        return axios.get(`${baseURL}?developer=Altunin`).then(response => response.data);
        } catch (e) {
            throw e
        }
    },
    createTask(form) {
        try {
        const { username, email, text } = form;
        const formData = new FormData()
        formData.append("username", username);
        formData.append("email", email);
        formData.append("text", text);

        return axios.post(`${baseURL}create?developer=Altunin`,
            formData).then(response => response.data);
        } catch (e) {
            throw e
        }
    },
    getTasksByPageNumberEndFilter(num, filterName) {
        try {
        const urlParametr = getUrlParameter(num, filterName)
        return axios.get(`${baseURL}?developer=Altunin${urlParametr}`).then(response => response.data);
        } catch (e) {
            throw e
        }
    }
};

export const editingTaskAPI = {
    editingTask(form) {
        try {
        const { token, text, status, id } = form;
        const formData = new FormData()
        formData.append("token", token);
        formData.append("text", text);
        formData.append("status", status);

        return axios.post(`${baseURL}edit/${id}?developer=Altunin`,
            formData).then(response => response.data);
        } catch (e) {
            throw e
        }
    }
}
