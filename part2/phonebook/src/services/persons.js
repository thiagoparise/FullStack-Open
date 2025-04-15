import axios from 'axios'

const getAll = () => {
    return axios.get('http://localhost:3001/persons').then(response => response.data);
}

const create = newObject => {
    return axios.post('http://localhost:3001/persons', newObject).then(response => response.data);
}

const update = (id, newObject) => {
    return axios.put(`http://localhost:3001/persons/${id}`, newObject).then(response => response.data);
}

const deleteContact = id => {
    return axios.delete(`http://localhost:3001/persons/${id}`).then(response => response.data);
}

export default { getAll, create, update, deleteContact }