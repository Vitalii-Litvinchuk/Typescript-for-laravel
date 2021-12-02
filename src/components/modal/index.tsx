import { useState } from "react";
import { Modal, Button } from 'react-bootstrap';

type ModalProps = {
    title: string,
    body: string,
    button?: string,
    onClick: () => void
    onHide: () => void
};

const ModalInfo = ({ title, body, button = "OK", onClick, onHide }: ModalProps) => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal show={show} onHide={() => { handleClose(); onHide(); }} backdrop='static' keyboard="False">
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button className="px-4" variant="primary" onClick={() => { handleClose(); onClick(); }}>
                        {button}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalInfo;