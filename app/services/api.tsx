import axios from 'axios';
import * as con from "./constants";

export const login = async (data) =>{
    try{
        let res = await axios.post(con.LOGIN,data);
    }
    catch(e)
    {
        throw handler(e);
    }
}

const handler = (err) =>{
    let error = err;

    if(err.response && err.response.data.hasOwnProperty("message"))
        error = err.response.data;
    else if (!err.hasOwnProperty("message")) error = err.toJSON();

    return new Error(error.message);
}

