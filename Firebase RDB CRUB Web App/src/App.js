import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ContactList from './components/contactlist'

function App() {
  return (
    <div>      
      <Row>
        <Col md = {{ span: 8, offset: 2 }}>
          <ContactList />
        </Col>
      </Row>
    </div>
  );
}

export default App