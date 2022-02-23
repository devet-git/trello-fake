import { Button, Modal } from 'react-bootstrap';
import React from 'react';
import { MODAL_CLOSE, MODAL_CONFIRM } from 'utilities/constants';
import HTMLReactParser from 'html-react-parser';
export default function ConfirmModal(props) {
   const { title, content, show, onAction } = props;
   return (
      <Modal
         show={show}
         onHide={() => onAction(MODAL_CLOSE)}
         backdrop="static"
         keyboard={false}
      >
         <Modal.Header closeButton>
            <Modal.Title>{HTMLReactParser(title)}</Modal.Title>
         </Modal.Header>
         <Modal.Body>{HTMLReactParser(content)}</Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={() => onAction(MODAL_CLOSE)}>
               Close
            </Button>
            <Button variant="primary" onClick={() => onAction(MODAL_CONFIRM)}>
               Confirm
            </Button>
         </Modal.Footer>
      </Modal>
   );
}
