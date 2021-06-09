import React, { useState, useEffect } from 'react'
import { Form, InputGroup, Col, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faMobileAlt, faEnvelope, faAddressCard } from '@fortawesome/free-solid-svg-icons'

function ContactForm(props) {

    const initialState = {
        fullName: '',
        contact: '',
        email: '',
        address: ''
    }

    var [values, setValues] = useState(initialState)

    useEffect(() => {
        if(props.current !== '') setValues(props.contactObjects[props.current])
    }, [props.current, props.contactObjects])
    
    const handleChange = (event) => {
        var { name, value } = event.target
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        props.addOrEdit(values)
    }

    return (
        <div>
            <Form autoComplete = "off" onSubmit = { handleSubmit }>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text><FontAwesomeIcon icon = { faUser } /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type = "text" placeholder = "Full Name . ." name = "fullName" value = { values.fullName } onChange = { handleChange } />                    
                    </InputGroup> 
                </Form.Group>
                <Form.Row>
                    <Form.Group as = {Col}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><FontAwesomeIcon icon = { faMobileAlt } /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type = "text" placeholder = "Contact . ." name = "contact" value = { values.contact } onChange = { handleChange } />                    
                        </InputGroup> 
                    </Form.Group>
                    <Form.Group as = {Col}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text><FontAwesomeIcon icon = { faEnvelope } /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type = "email" placeholder = "Email . ." name = "email" value = { values.email } onChange = { handleChange } />                    
                        </InputGroup> 
                    </Form.Group>                    
                </Form.Row>
                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text><FontAwesomeIcon icon = { faAddressCard } /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type = "text" placeholder = "Address . ." name = "address" value = { values.address } onChange = { handleChange } />                    
                    </InputGroup> 
                </Form.Group>
                <Button variant = "dark" type = "submit" size = "sm" block>{ props.current === '' ? 'Save' : 'Update' }</Button>
            </Form>
        </div>
    )
}

export default ContactForm