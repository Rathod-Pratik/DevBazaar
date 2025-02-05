import { HOST } from "../Utils/Constant" ;
import   axios  from "axios";

export const apiClient =axios.create({
    baseURL:HOST
})