import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Button
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import { useState } from 'react';
import Link from 'next/link'

const AllProducts = ({ products }) => {

  const [type, setType] = useState('')

  const handleRadioChange = (event) => {
    setType(event.target.name)
  }

  return (
    <BaseCard title="All Products">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group">
          <div className='flex flex-col lg:flex-row '>
            <FormControlLabel
              value='tshirts'
              control={<Radio />}
              label="Tshirts"
              name="tshirts"
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value='hoodies'
              control={<Radio />}
              label="Hoodies"
              name="hoodies"
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value="jeans"
              control={<Radio />}
              label="Jeans"
              name="jeans"
              onChange={handleRadioChange}
            />
            <FormControlLabel
              value="trousers"
              control={<Radio />}
              label="Trousers"
              name="trousers"
              onChange={handleRadioChange}
            />
          </div>
        </RadioGroup>
      </FormControl>
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
                Slug
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
              {product.category == type && <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {product.title}
                </Typography>
              </TableCell>}
              {product.category == type && <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {product.slug}
                </Typography>
              </TableCell>}
              {product.category == type && <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  <img style={{ height: '52px' }} src={product.img} alt='' />
                </Typography>
              </TableCell>}

              {product.category == type && <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  {product.size}/{product.color}
                </Typography>
              </TableCell>}
              {product.category == type && <TableCell align="center">
                <Typography variant="h6">
                  {product.availableQty}
                </Typography>
              </TableCell>}
              {product.category == type && <TableCell align="center">
                <Typography variant="h6">₹{product.price}</Typography>
              </TableCell>}
              {product.category == type && <TableCell align="center">
                <div className="text-blue-700"><Link href={'/admin/update?slug='+ product.slug}>
                  Edit</Link></div>
              </TableCell>}
              {product.category == type && <TableCell align="center">
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
