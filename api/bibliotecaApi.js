import axios from 'axios';



const bibliotecaApi = axios.create({
    baseURL: '/api'
});


export default bibliotecaApi;