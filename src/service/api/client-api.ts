import { apiUrl } from "@/helpers/shared";
import axios, { AxiosInstance, AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

const responseInstance = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => {
      return res
    },
    (error) => {
      console.error(error);
      return Promise.reject(error)
    }
  )
}

// Request instance
const requestInstance = ({ instance, headers }: { instance: AxiosInstance, headers: AxiosRequestHeaders }) => {
  instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
      return {
        ...config,
        headers,
      }
    }
  )
}

const privateInstance: AxiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true
})

requestInstance({ instance: privateInstance, headers: { "Content-Type": 'application/json' } as AxiosRequestHeaders })
responseInstance(privateInstance)


export { privateInstance }