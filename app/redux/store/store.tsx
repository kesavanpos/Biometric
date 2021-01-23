
import { createStore } from "redux";
import  userReducer from "./reducer/userReducer";

const configureStore = createStore(
    userReducer
)

export default configureStore