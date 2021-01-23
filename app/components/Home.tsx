import React,{useState } from 'react';
import { AlertAndroid, Button, View,TextInput,StyleSheet,Text,TouchableOpacity } from 'react-native';
import {connect} from 'react-redux';
//import { login } from "../services/api";
import axios from 'axios';
import { LOGIN_USER } from "../redux/store/constants/index";
import IUserModel  from "../models/usermodel";
import { useSelector,useDispatch } from 'react-redux';
import { loginUser } from "../redux/store/actions/useractions";
import configureStore from "../../app/redux/store/store";
import TouchID from 'react-native-touch-id'

const HomeScreen : React.FC<IUserModel> = ({ navigation,props }) => {
  
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('');
  const [biometryType,setBiometryType] = useState('');

  const state = useSelector(state => state.login);
  const compDispatch = useDispatch()

 //config is optional to be passed in on Android
 const optionalConfigObject = {
  title: "Authentication Required", // Android
  color: "#e00606", // Android,
  fallbackLabel: "Show Passcode" // iOS (if empty, then label is hidden)
}

const checkBiometry = () =>{
  TouchID.isSupported()
      .then(biometryType => {
        setBiometryType(biometryType);
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else if (biometryType === 'TouchID'){
            pressHandler();
          console.log('TouchID is supported.');
        } else if (biometryType === true) {
      	  // Touch ID is supported on Android
	}
  })
  .catch(error => {
    // Failure code if the user's device does not have touchID or faceID enabled
    console.log(error);
  });
}

const pressHandler = () => {
  TouchID.authenticate('to demo this react-native component', optionalConfigObject)
    .then(success => {
      AlertAndroid.alert('Authenticated Successfully');
    })
    .catch(error => {
      AlertAndroid.alert('Authentication Failed');
    });
}

const submitData = () => {    

  fetch('LOGIN API URL',{
    method: 'post',
    headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },  
    body: JSON.stringify({
      email:username,
      password: password
    }),
  })
  .then(response =>{
    if(response.status >= 200 && response.status < 300)
    {
      compDispatch(loginUser({login:{username:username,password:password}}));
      configureStore.subscribe(() =>{    
      const objState =  configureStore.getState();    
        if(objState.isAuthenticated == false)
        {
          checkBiometry();
        }
      })
    }
    else{
      
    }
  })
}
  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Biometric</Text>
      <View style={styles.inputView}>
          <TextInput 
              style={styles.inputText}
              placeholder="Email."
              placeholderTextColor="#003f5c"
              onChangeText={(username) => setUserName(username)}
          />
      </View>
      <View style={styles.inputView}>
          <TextInput 
              style={styles.inputText}
              placeholder="password"
              placeholderTextColor="#003f5c"
              onChangeText={(password) => setUserName(password)}
          />
      </View>

      <TouchableOpacity style={styles.loginBtn}
        onPress={submitData}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,    
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  }, 
  loginText:{
    color:"white"
  }
})

export default HomeScreen;
