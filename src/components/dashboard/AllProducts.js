import React, { useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Button, MenuItem, TextField, Pagination, Box, Checkbox, CircularProgress, Modal
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { productcatelogue } from "../../../productcatalogue";

const AllProducts = ({ products, page, totalPages }) => {

  const [type, setType] = useState('')

  const router = useRouter()

  const handleRadioChange = (event) => {
    setType(event.target.name)
    setSubcategory("")
  }

  const [subcategory, setSubcategory] = useState('')
  const [count, setCount] = useState('')

  const handleChange = (e) => {
    setTimeout(() => {
      const value = e.target.value
      setSubcategory(value)
    });
    router.push(`/admin/allproducts?category=${type}&theme=${e.target.value}`)
  }

  useEffect(() => {
    setCount(products.length)
  }, [router])

  useEffect(() => {
    if (router.query.category) setType(router.query.category);
    if (router.query.theme) setSubcategory(router.query.theme);
  }, [router.query])

  const handlePageChange = (event, value) => {
    if (router.query.page) {
      router.push(`${router.asPath.replace(router.query.page, value)}`)
    }
    else {
      if (router.asPath.includes('?')) {
        router.push(`${router.asPath}&page=${value}`)
      }
      else {
        router.push(`${router.asPath}?page=${value}`)
      }
    }
  }

  const [prod, setProd] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleDeleteChange = (e) => {
    if (prod.includes(e.target.value)) {
      setProd(prod.filter((item) => item !== e.target.value))
    }
    else {
      setProd([...prod, e.target.value])
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setLoading(false);
    setLoading(true);
    setOpen(true);
  };

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  const submitDeletion = async (e) => {
    setOpen(false);
    setLoading(true);
    let a = await fetch(`/api/deleteproducts`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prod),
    })
    let res = await a.json()
    setLoading(false);
    if (res.success) {
      toast.success("Items Deleted Sucessfully!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setProd([]);
      router.push(router.asPath)
    }
    else {
      toast.error(res.error, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <BaseCard title="All Products">
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Modal open={open} onClose={handleClose}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
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
          borderRadius: '10px'
        }}>
          <div>
            Are you sure you want to delete these items? Selected: {prod.length}
          </div>
          <div>
            <button onClick={submitDeletion} className="bg-red-500 hover:bg-red-700 text-black font-bold py-2 px-4 rounded">Yes</button>
            <button onClick={handleClose} className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">No</button>
          </div>
        </div>
      </Modal>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group">
          <div className='flex flex-col lg:flex-row'>
            {productcatelogue.map((item, index) => <FormControlLabel
              key={index}
              value={item.value}
              control={<Radio />}
              label={item.title}
              name={item.value}
              onChange={handleRadioChange}
              checked={type == item.value}
            />)}
          </div>
        </RadioGroup>
      </FormControl>

      <div className="my-3">
        {productcatelogue.map((item) => {
          return type == item.value && <TextField key={item.title} label='Subcategory' name='subcategory' select value={subcategory} onChange={handleChange} fullWidth>
            {item.submenu && item.submenu.map((subitems, index) => {
              return (<MenuItem key={index} value={subitems.value}>{subitems.title}</MenuItem>);
            })}
          </TextField>
        })}
      </div>

      {Object.keys(products)?.length > 0 && <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
        variant="outlined" color="primary"
      />}

      {prod.length > 0 && <div className="flex flex-1 justify-end">
        <div>
          <p><b>Selected:</b> {prod.length}</p>
        </div>
        {loading ? <CircularProgress color="primary" />
          :
          <Button variant="contained" color="primary" sx={{ height: '30px', marginLeft: '20px' }} onClick={handleOpen}>Delete</Button>
        }
      </div>}

      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                #
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Title
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                SkuId
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Edit
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Details
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(products)?.map((product) => {
            return <TableRow key={products[product]?._id}>
              {<TableCell align="center" sx={{
                alignItems: "center",
                justifyContent: "center",
              }}>
                <FormControlLabel
                  control={<Checkbox name="" value={products[product]._id} checked={!!prod.includes(products[product]._id)} onChange={handleDeleteChange} />}
                  label={""}
                />
              </TableCell>}
              {<TableCell sx={{
                paddingRight: '4px',
                maxWidth: '20rem',
                overflowX: "auto",
                paddingBottom: '0px',
              }}>
                <div className="flex flex-col max-w-xs">
                  <p className="font-bold text-gray-700">{products[product]?.title}</p>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "13px",
                    color: "grey",
                  }}>
                    Fabric: <p className="font-bold text-gray-700">{products[product]?.fabric}</p>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "13px",
                    color: "grey",
                  }}>
                    Size/Color: <p className="font-bold text-gray-700">{products[product]?.size}/{products[product]?.color}</p>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "13px",
                    color: "grey",
                  }}>
                    Price: <p className="font-bold text-gray-700">{products[product]?.price}</p>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    fontSize: "13px",
                    color: "grey",
                  }}>
                    Available Qty: <p className="font-bold text-gray-700">{products[product]?.availableQty}</p>
                  </Box>
                </div>
              </TableCell>}
              {<TableCell align="center" sx={{
                display: "flex",
                justifyContent: "center",
              }}>
                <img style={{ height: '100px' }} src={products[product]?.img} alt='1' />
              </TableCell>}
              {<TableCell align="center">
                <Typography variant="h6">{products[product]?.skuId}</Typography>
              </TableCell>}
              {<TableCell align="center">
                <div className="text-blue-700"><Link href={'/admin/update?slug=' + products[product]?.slug}>
                  Edit</Link></div>
              </TableCell>}
              {<TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: 'blue'
                  }}
                >
                  <Link href={'/product/' + products[product]?.slug}>Details</Link>
                </Typography>
              </TableCell>}
            </TableRow>

          })}
        </TableBody>
      </Table>
      {Object.keys(products)?.length > 0 && <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '3rem', marginBottom: '3rem' }}
        variant="outlined" color="primary"
      />}
    </BaseCard>
  );
};

export default AllProducts;
