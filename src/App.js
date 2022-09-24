import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import app from "./firebase";
import "./App.css";
import Home from "./components/Home";
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
  
} from "firebase/auth";

function App() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  //this is the sign up function
  const handleSignup = async () => {
    clearErrors();
    let Auth = getAuth();
    let result = await createUserWithEmailAndPassword(Auth, email, password);
    firebase
      .auth()
    .catch((err) => {
      console.log(err)
      switch (err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPasswordError(err.message);
          break;
      }
    });
  };

  // this is the log in function
  const handleLogin = () => {
    clearErrors();
    let Auth = getAuth();
    let result = signInWithEmailAndPassword(Auth, email, password);
    // firebase
    //   .auth()
    //   .catch((err) => {
    //     switch (err.code) {
    //       case "auth/invalid-email":
    //       case "auth/user-disabled":
    //       case "auth/user=not-found":
    //         setEmailError(err.message);
    //         break;
    //       case "auth/weak-password":
    //         setPasswordError(err.message);
    //         break;
    //     }
    //   });
  };

  //this is the log out function
  const handleLogout = () => {
    firebase.auth().signOut();
  };

  //to track the existence of users
  const authListener = () => {
    console.log({ firebase });

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // firebase.auth().onAuthStateChange((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  return (
    <div className="App">
      <LogIn
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
      />
    </div>
  );
}

export default App;
