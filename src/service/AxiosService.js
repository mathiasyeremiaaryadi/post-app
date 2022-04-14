/* eslint-disable prettier/prettier */
import axios from 'axios'

export const AXIOS_SERVICE = axios.create({
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
})
