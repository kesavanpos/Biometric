import { LOGIN_USER } from "../constants/index";

const initialState = {
    isAuthenticated:false,
    login: {
        username: '',
        password: ''
    }
}

const userReducer = (state = initialState,action) =>{
    switch(action.type)
    {
        case LOGIN_USER:            
            return{
                ...state,
                login:action.payload,
                isAuthenticated:true
            }
            default: 
            break;
    }
    return state;
}

export default userReducer