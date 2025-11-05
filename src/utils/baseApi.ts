import axios from "axios"; 
import { envs } from "../config/envs";


export const  apiRequest = async(method : string,route : string,data=null,headers={}) =>{
     try {
          const res = await axios({
               method,
               url :`${envs.BACKEND_URL}/api/v1${route}`,
               data,
               headers
          });
          return res.data;
     } catch (error) {
          throw error;
     }
}

