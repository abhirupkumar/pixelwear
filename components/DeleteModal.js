import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react'

const DeleteModal = () => {

    const [deleteProd, setDeleteProd] = useState()

    return (
        <div style={{
            display: 'flex',
            flexDirection: "column",
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
            <div className="flex flex-col max-w-xs">
                <p className="font-bold text-gray-700">{product?.title}</p>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "13px",
                    color: "grey",
                }}>
                    Fabric: <p className="font-bold text-gray-700">{product?.fabric}</p>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "13px",
                    color: "grey",
                }}>
                    Size/Color: <p className="font-bold text-gray-700">{product?.size}/{product?.color}</p>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "13px",
                    color: "grey",
                }}>
                    Price: <p className="font-bold text-gray-700">{product?.price}</p>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "13px",
                    color: "grey",
                }}>
                    Sku Id: <p className="font-bold text-gray-700">{product?.skuId}</p>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "13px",
                    color: "grey",
                }}>
                    Available Qty: <p className="font-bold text-gray-700">{product?.availableQty}</p>
                </Box>
            </div>
            <div className="max-w-xs">
                <img style={{ height: '100px' }} src={product?.img} alt='delete-product' />
            </div>
            <div className="flex space-x-4">
                <TextField
                    label="SKU ID"
                    value={deleteProd}
                    onChange={(e) => setDeleteProd(e.target.value)}
                    className="flex-1 pr-4"
                />
                <Button variant="contained" disabled={!(deleteProd === product?.skuId)} color="red" sx={{ height: '50px' }}>
                    Delete Permanently
                </Button>
            </div>
        </div>
    );

}

export default DeleteModal