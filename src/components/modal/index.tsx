import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';

type ModalProps = {
    title?: string,
    body: string,
    bodyClass?: string,
    button?: string,
    onClick?: () => void
    onHide?: () => void
};

const ModalInfo = ({ title, body, bodyClass, button = "OK", onClick, onHide }: ModalProps) => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={() => { handleClose(); if (onHide) onHide(); }} keyboard="False">
                <Modal.Header>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={bodyClass}>{body}</Modal.Body>
                <Modal.Footer>
                    <Button className="px-4" variant="primary" onClick={() => { handleClose(); if (onClick) onClick(); }}>
                        {button}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalInfo;