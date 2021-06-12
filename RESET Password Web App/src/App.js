import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import './assets/css/main.css'

firebase.initializeApp({
    apiKey: "AIzaSyCQPeOd9FIve-QRkYvDnlFmiaM3bHUL38M",
    authDomain: "reset-user-react.firebaseapp.com",
    projectId: "reset-user-react",
    appId: "1:721887457351:web:013c05f97898a4c1b98162"
})

function App() {
  const [mail, setMail] = useState("")
  const [key, setKey] = useState("")
  const [alias, setAlias] = useState("")
  const [avatar, setAvatar] = useState("")
  const [guy, setGuy] = useState({})
  const [logInStatus, setLogInStatus] = useState(false)
  const [login, setLogin] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setGuy(user)
        setLogInStatus(true)
      } else {
        setLogInStatus(false)
      }  
    })    
  }, [logInStatus]);

  const handleOAuth = () => {
    firebase.auth()
            .createUserWithEmailAndPassword(mail, key)
            .then((credential) => {
              var user = credential.user
              console.log(user)
              setMail("")
              setKey("")
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.error(errorCode)
              console.error(errorMessage)
            });
  }

  const handleLogIn = () => {
    firebase.auth()
            .signInWithEmailAndPassword(mail, key)
            .then((credential) => {
              var user = credential.user
              console.log(user)
              setMail("")
              setKey("")
              setLogin(false)
            })
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.error(errorCode)
              console.error(errorMessage)
            });
  }

  const handleReset = () => {
    const mailbox = prompt("Enter mail for passkey reset!")
    firebase.auth()
            .sendPasswordResetEmail(mailbox)
            .catch((error) => {
              var errorCode = error.code;
              var errorMessage = error.message;
              console.log(errorCode)
              console.log(errorMessage)
            });
  }

  const handleProfile = () => {
    if(guy) {
      guy.updateProfile({
        displayName: alias,
        photoURL: avatar
      }).then(() => {
        setAlias("")
        setAvatar("")
      })
      .catch((error) => {
        console.log(error)
      }); 
    }
  }

  return (
    <div>
      <main className = "flex items-center justify-center bg-purple-200 h-full">
        <div className = "bg-yellow-400 p-16 grid grid-cols-2 gap-x-10 rounded-xl">
          { 
            login ? <div className = "mt-6 pl-12">
              <span className = "font-extrabold text-3xl">Log In!</span>
              <div className = "mt-12">
                <div>
                  <input type = "email" placeholder = "Email . ." className = "rounded-2xl outline-none shadow-lg w-full p-2" onChange = { ({ target }) => setMail(target.value) } required />
                </div>
                <div className = "mt-6">
                  <input type = "password" placeholder = "Password . ." className = "rounded-2xl outline-none shadow-lg w-full p-2" onChange = { ({ target }) => setKey(target.value) } required />
                </div>
                <div className = "mt-6">
                  <button className = "bg-black focus:outline-none text-white rounded-2xl p-2 w-full font-mono" onClick = { handleLogIn }>Jump In</button>
                </div>
                <div className = "mt-8  text-center">
                  <span className = "font-mono" onClick = { handleReset }>Forgot password? Send a reset mail!</span>
                </div>
              </div>
            </div> : <img src = "./images/light.jpg" className = "h-96 rounded-xl" alt = "" /> 
          }
          {
            logInStatus ? <div>
              <span className = "bg-red-500 font-mono rounded-2xl w-full p-4">Currently logged in as {guy.email}!</span>
              <div className = "mt-12">
                  <input type = "text" placeholder = "Username . ." className = "rounded-2xl outline-none shadow-lg w-full p-2" onChange = { ({ target }) => setAlias(target.value) } />
                </div>
                <div className = "mt-6">
                  <input type = "text" placeholder = "Photo URL . ." className = "rounded-2xl outline-none shadow-lg w-full p-2" onChange = { ({ target }) => setAvatar(target.value) } />
                </div>
                <div className = "mt-6">
                  <button className = "bg-pink-400 focus:outline-none text-white rounded-2xl p-2 w-full font-mono" onClick = { handleProfile }>Update</button>
                </div>
                <figure class = "flex bg-gray-100 mt-6 rounded-xl pt-4 pb-4">
                  <img class = "w-44 h-44 rounded-full p-6" src = {guy.photoURL} alt = "" width = "384" height = "512" />
                  <div class = "pt-6 text-left">
                    <figcaption class = "font-semibold">
                      Current Alias<br/>
                      {guy.displayName}
                      <div class = "text-gray-500"><button className = "rounded mt-12 text-white bg-black p-2" onClick = { () => firebase.auth().signOut() }>Sign Out</button></div>
                    </figcaption>
                  </div>
                </figure>
            </div> : <div className = "mt-6 pl-12">
              <span className = "font-extrabold text-3xl">Sign Up!</span>
              <div className = "mt-12">
                <div>
                  <input type = "email" placeholder = "Email . ." className = "rounded-2xl outline-none shadow-lg w-full p-2" onChange = { ({ target }) => setMail(target.value) } required />
                </div>
                <div className = "mt-6">
                  <input type = "password" placeholder = "Password . ." className = "rounded-2xl outline-none shadow-lg w-full p-2" onChange = { ({ target }) => setKey(target.value) } required />
                </div>
                <div className = "mt-6">
                  <button className = "bg-black focus:outline-none text-white rounded-2xl p-2 w-full font-mono" onClick = { handleOAuth }>Create Account</button>
                </div>
                <div className = "mt-8  text-center">
                  <span className = "font-mono" onClick = { () => setLogin(true) }>Already Registered? Sign in!</span>
                </div>
              </div>
            </div>
          }
        </div>
      </main>
    </div>
  )
}

export default App