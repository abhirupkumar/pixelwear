import React, { useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Button, MenuItem, TextField, Pagination, Box
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from "next/router";

const AllProducts = ({ products }) => {

  const productcatelogue = [
    {
      title: "sarees",
      submenu: [{
        title: "sarees",
      }]
    },
    {
      title: "bottoms",
      submenu: [{
        title: "ankleleggings",
      },
      {
        title: "caprileggings",
      },
      {
        title: "churidarleggings",
      },
      {
        title: "palazzo",
      },
      {
        title: "patiala",
      },
      {
        title: "straightpant",
      },
      ],
    },
    {
      title: "tops",
      submenu: [{
        title: "tshirts",
      },
      {
        title: "hoodies",
      },
      ],
    },
    {
      title: "innerwear",
      submenu: [{
        title: "shorts",
      },
      ],
    },
    {
      title: "kids",
      submenu: [{
        title: "bottoms/ankleleggings",
      },
      {
        title: "bottoms/capri",
      },
      {
        title: "shorts",
      },
      ],
    },
    {
      title: "loungewear",
      submenu: [{
        title: "pyjama",
      },
      {
        title: "capri",
      },
      {
        title: "shorty",
      },
      {
        title: "longtee",
      },
      ],
    },
  ];

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
    router.push(`/adminpanel_lesoft/allproducts?category=${type}&theme=${e.target.value}`)
  }

  useEffect(() => {
    setCount(products.length)
  }, [router])

  return (
    <BaseCard title="All Products">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group">
          <div className='flex flex-col lg:flex-row'>
            <FormControlLabel
              value='sarees'
              control={<Radio />}
              label="Sarees"
              name="sarees"
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value='bottoms'
              control={<Radio />}
              label="Bottoms"
              name="bottoms"
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value="tops"
              control={<Radio />}
              label="Tops"
              name="tops"
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value="innerwear"
              control={<Radio />}
              label="Inner Wear"
              name="innerwear"
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value="kids"
              control={<Radio />}
              label="Kids"
              name="kids"
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value="loungewear"
              control={<Radio />}
              label="Lounge Wear"
              name="loungewear"
              onChange={handleRadioChange}
            />
          </div>
        </RadioGroup>
      </FormControl>

      <div className="my-3">
        {productcatelogue.map((item) => {
          return type == item.title && <TextField key={item.title} label='Subcategory' name='subcategory' select value={subcategory} onChange={handleChange} fullWidth>
            {item.submenu && item.submenu.map((subitems, index) => {
              return (<MenuItem key={index} value={subitems.title}>{subitems.title}</MenuItem>);
            })}
          </TextField>
        })}
      </div>

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
          {products?.map((product) => {
            return <TableRow key={product?._id}>
              {<TableCell sx={{
                paddingRight: '4px',
                maxWidth: '20rem',
                overflowX: 'auto',
                paddingBottom: '0px',
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
                    Available Qty: <p className="font-bold text-gray-700">{product?.availableQty}</p>
                  </Box>
                </div>
              </TableCell>}
              {<TableCell align="center" sx={{
                display: "flex",
                justifyContent: "center",
              }}>
                <img style={{ height: '100px' }} src={product?.img} alt='1' loading="lazy" />
              </TableCell>}
              {<TableCell align="center">
                <Typography variant="h6">{product?.skuId}</Typography>
              </TableCell>}
              {<TableCell align="center">
                <div className="text-blue-700"><Link href={'/adminpanel_lesoft/update?slug=' + product?.slug}>
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
                  <Link href={'/product/' + product?.slug}>Details</Link>
                </Typography>
              </TableCell>}
            </TableRow>
          })}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default AllProducts;
