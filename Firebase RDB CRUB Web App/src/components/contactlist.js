import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Jumbotron, Container, Row, Col, Table, Button } from 'react-bootstrap'
import ContactForm from '../components/contactform'
import fireDB from '../firebase'

function ContactList() {

    const [contactObjects, setContactObjects] = useState({})
    const [current, setCurrent] = useState('')
    
    useEffect(() => {
        fireDB.child('contacts').on('value', (snapshot) => {
            if(snapshot.val() != null) setContactObjects(snapshot.val())
            else setContactObjects({})
        })
    }, [])
    
    const addOrEdit = (object) => {
        if(current === ''){
            fireDB.child('contacts').push(object)
        } else {
            fireDB.child(`contacts/${current}`).set(object)
        }
    }

    const handleDelete = (key) => {
        if(window.confirm("Are you sure to delete this contact ?")){
            fireDB.child(`contacts/${key}`).remove()
        }
    }

    return (
        <div>
            <Jumbotron fluid className = "mt-4">
                <Container>
                    <h1 className = "display-4 text-center">Manage Contacts</h1>
                </Container>
            </Jumbotron>
            <Row>
                <Col md = {5}>
                    <ContactForm {...({ addOrEdit, current, contactObjects })} />
                </Col>
                <Col md = {7}>
                    <Table striped size="sm">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Contact</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map((key) => {
                                    return <tr>
                                        <td>{ contactObjects[key].fullName }</td>
                                        <td>{ contactObjects[key].contact }</td>
                                        <td>{ contactObjects[key].email }</td>
                                        <td>{ contactObjects[key].address }</td>
                                        <td>
                                          <Row>  
                                            <Button size = "sm" className = "mr-2" variant = "warning" onClick = { () => setCurrent(key) }><FontAwesomeIcon icon = { faPencilAlt } /></Button>
                                            <Button size = "sm" className = "mr-2" variant = "warning" onClick = { () => handleDelete(key) }><FontAwesomeIcon icon = { faTrashAlt } /></Button>
                                          </Row>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>        
                </Col>
            </Row>
        </div>
    )
}

export default ContactList