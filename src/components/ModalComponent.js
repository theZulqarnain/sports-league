import { Modal, Button } from 'react-bootstrap'

const ModalComponent = (props) =>{

    return(
        <Modal
        {...props}
        size={props.size ? props.size : "lg"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
            <Modal.Header closeButton 
            onHide={props.handleClose}
            >
                <Modal.Title id="contained-modal-title-vcenter">
                {props.header}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.handleSubmit}>
                   {props.subBtnText ? props.subBtnText : 'Save Changes'} 
                </Button>
            </Modal.Footer>
        </Modal>
  );
}

export  default ModalComponent;