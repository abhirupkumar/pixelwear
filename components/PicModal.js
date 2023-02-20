import { Modal } from '@mui/material';
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const PicModal = ({ img }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <img src={img} alt="Product Image" onClick={handleOpen} className="cursor-pointer" />
            <Modal open={open} onClose={handleClose}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
                    padding: "20px",
                    outline: 'none',
                    maxWidth: '800px',
                    maxHeight: '98%',
                    overflow: 'auto',
                }}>
                    <img src={img} alt="Product Image" style={{
                        width: '100%',
                        objectFit: 'none',
                        height: '100%',
                    }} />
                    <CloseIcon style={{
                        position: 'absolute',
                        top: "5px",
                        right: "10px",
                        cursor: 'pointer',
                    }} onClick={handleClose} />
                </div>
            </Modal>
        </>
    );

}

export default PicModal