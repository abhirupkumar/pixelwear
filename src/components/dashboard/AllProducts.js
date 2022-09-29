import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Button, MenuItem, TextField
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import { useState } from 'react';
import Link from 'next/link'

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

  const handleRadioChange = (event) => {
    setType(event.target.name)
  }

  const [subcategory, setSubcategory] = useState('')

  const handleChange = (e) => {
    const value = e.target.value
    setSubcategory(value)
  }

  return (
    <BaseCard title="All Products">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group">
          <div className='flex flex-col lg:flex-row overflow-x-scroll'>
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
          return type == item.title && <TextField label='Subcategory' name='subcategory' select value={subcategory} onChange={handleChange} fullWidth>
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
                Fabric
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Image
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Size/Color
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Available Qty
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography color="textSecondary" variant="h6">
                Link
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
          {products.map((product) => (
            <TableRow key={product._id}>
              {product.theme == subcategory && <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {product.title}
                </Typography>
              </TableCell>}
              {product.theme == subcategory && <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {product.fabric}
                </Typography>
              </TableCell>}
              {product.theme == subcategory && <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  <img style={{ height: '52px' }} src={product.img} alt='' />
                </Typography>
              </TableCell>}

              {product.theme == subcategory && <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  {product.size}/{product.color}
                </Typography>
              </TableCell>}
              {product.theme == subcategory && <TableCell align="center">
                <Typography variant="h6">
                  {product.availableQty}
                </Typography>
              </TableCell>}
              {product.theme == subcategory && <TableCell align="center">
                <Typography variant="h6">₹{product.price}</Typography>
              </TableCell>}
              {product.theme == subcategory && <TableCell align="center">
                <div className="text-blue-700"><Link href={'/admin/update?slug=' + product.slug}>
                  Edit</Link></div>
              </TableCell>}
              {product.theme == subcategory && <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: 'blue'
                  }}
                >
                  <Link href={'/product/' + product.slug}>Details</Link>
                </Typography>
              </TableCell>}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default AllProducts;
