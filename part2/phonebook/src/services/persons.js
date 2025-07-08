import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/api/persons');
}

const create = newObject => {
    return axios.post('http://localhost:3001/api/persons', newObject);
}

const update = (id, newObject) => {
    return axios.put(`http://localhost:3001/api/persons/${id}`, newObject);
}

const deleteContact = id => {
    return axios.delete(`http://localhost:3001/api/persons/${id}`);
}

export default { getAll, create, update, deleteContact }