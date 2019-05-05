const axios = require('axios')

const instance = axios.create({
    baseURL: '',
    timeout: 1000,
    headers: {}
})
