import {useEffect} from 'react';
import { createPortal } from 'react-dom';
import { Overlay, Content } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('modal-root');

export default function Modal({children, onClose}) {

    useEffect(() => {
        const closeModal = e => {
            if (e.code === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', closeModal);
        
        return() => {
            window.removeEventListener('keydown', closeModal);
        }
    }, [onClose])
    
    const closeByClick = e => {
        if (e.currentTarget === e.target) {
            onClose();
        }
    };

        return createPortal(
            <Overlay onClick={closeByClick}>
                <Content>{children}</Content>
            </Overlay>,
            modalRoot
        )
}

export {Modal}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};