import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:2800'
})

const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;