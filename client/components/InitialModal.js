import React from 'react'
import { Modal, Button } from 'react-bootstrap';
const InitialModal = (props) => {
  return (
    <div>
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Welcome to SpaceHash
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        Enter in your wishes, hopes, and dreams to be immortalized in the stars 
        forever.
      <br></br>
      <br></br>
        We will hash them away into the bitverse, keeping them secret and protected.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={props.onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
    </div>
  )
}

export default InitialModal


