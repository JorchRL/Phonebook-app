import axios from "axios";

// const baseUrl = "http://localhost:3001/persons";
const baseUrl = "/api/persons"; // Relative url -- to use with server from build and with proxy from development

const getAllNumbers = () => {
    const request = axios.get(baseUrl);
    return request.then((resp) => resp.data);
};

const addNumber = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((resp) => resp.data);
};

const deleteNumber = (deletedId) => {
    const request = axios.delete(`${baseUrl}/${deletedId}`);
    return request.then((r) => r);
};

const updateNumber = (newObject, updateId) => {
    const request = axios.put(`${baseUrl}/${updateId}`, newObject);
    return request.then((resp) => resp.data);
};

export default { getAllNumbers, addNumber, deleteNumber, updateNumber };
