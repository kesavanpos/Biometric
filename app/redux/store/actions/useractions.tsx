import { LOGIN_USER } from "../constants/index";


export const loginUser = (user) =>({
    type : LOGIN_USER,
    payload: user
})

