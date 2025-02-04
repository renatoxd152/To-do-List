import Axios, { AxiosInstance } from 'axios';

export const httpClient: AxiosInstance = Axios.create({
    baseURL:"https://jsonplaceholder.typicode.com"
})