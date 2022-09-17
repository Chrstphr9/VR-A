import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import LogIn from './components/LogIn';

function App() {

  const [user,  setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

// this is the log in fuction
  const handleLogin = () => {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(err => {
          switch(err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;
            case "auth/wrong-password":
              setPasswordError(err.message);
              break;
          }
        });
  };

  //this is the sign up fuction
  const handleSignup = () => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(err => {
          switch(err.code) {
            case "auth/invalid-email":
            case "auth/user-disabled":
            case "auth/user-not-found":
              setEmailError(err.message);
              break;
            case "auth/wrong-password":
              setPasswordError(err.message);
              break;
          }
        });
  };
  return (
    <div className="App">
    

    </div>
  );
}

export default App;
