import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import { Container, Jumbotron, Row, Col, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

firebase.initializeApp({
  apiKey: "AIzaSyDuTvB7So_YF4pGks1RuCXXl1azrFJ2oFE",
  authDomain: "react-8c498.firebaseapp.com",
  projectId: "react-8c498",
  appId: "1:930034892691:web:b6b228bcff6f8c15b8f266"
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
    var provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth()
            .signInWithRedirect(provider)
            .then((result) => console.log(result.credential))
            .catch((error) => console.log(error.message))    
  }

  return (
    <div>
      {
        logState ? ( <Container>
            <Jumbotron fluid className = "m-5 p-5">
              <Row>
                <Col>
                  <img src = {user.photoURL} className = "rounded-circle" alt = "" />
                  <br />
                  <Button variant = "dark" size = "lg" className = "mt-5" onClick = { () => firebase.auth().signOut() }>Sign Out Now!</Button>
                </Col>
                <Col>
                  <p className = "display-4">{user.displayName}</p>
                  <p className = "lead">{user.email}</p>
                  <p className = "lead">{user.uid}</p>
                </Col>
              </Row>              
            </Jumbotron>
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
