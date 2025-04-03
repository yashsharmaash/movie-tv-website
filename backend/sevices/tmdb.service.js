import axios from 'axios';
import {ENV_VARS} from '../config/envVars.js';


export const fetchfromTMDB = async (url)=>{
    const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY,
        }
      };
      const respose = await axios.get(url, options)
      if(respose.status !== 200){
          throw new Error('Failed to fetch data from TMDB'+ respose.statusText);}
return respose.data;
}

