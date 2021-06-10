import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Jumbotron, Container, Button, Card } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

firebase.initializeApp({
    apiKey: "AIzaSyBinrvhujNsgyYLt9E3YGgytfZvLBrvHkY",
    authDomain: "react-facebook-2f771.firebaseapp.com",
    projectId: "react-facebook-2f771",
    appId: "1:1093220010323:web:e0149a11d655697549f9a6"
})

function App() {
  const [logState, setLogState] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        setLogState(true)
        setUser(user)
      } else {
        setLogState(false)
      }
    });
  }, [logState])

  const loginUser = () => {
    var provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth()
            .signInWithRedirect(provider)
            .then((result) => console.log(result.credential))
            .catch((error) => console.log(error.message))    
  }

  return (
    <div>
      {
        logState ? ( <Container>
            <Card style = {{ width: "50%", marginTop: "10vh", marginLeft: "auto", marginRight: "auto" }}>
              <Card.Img variant = "top" style = {{ height: "40vh"}} src = {user.photoURL} />
              <Card.Body>
                <Card.Title>{user.displayName}</Card.Title>
                <Card.Subtitle>{user.email}</Card.Subtitle>
                <Card.Text>User currently logged in using Facebook with a unique identification code of {user.uid}.</Card.Text>
                <Button variant = "dark" onClick = { () => firebase.auth().signOut() }>Sign Out Now!</Button>
              </Card.Body>
            </Card>                  
          </Container>) : (<Container>
            <Jumbotron fluid className = "m-5 p-5">
              <p className = "display-4">User not seemingly signed in!</p>
              <Button variant = "dark" size = "lg" onClick = { loginUser }>Sign in here!</Button>              
            </Jumbotron>
          </Container>)
      }
    </div>
  )

}

export default App