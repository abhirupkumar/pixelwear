import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, FormControlLabel, FormControl, FormLabel, RadioGroup, Radio, Button
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from 'next/link'
import { Stack } from "@mui/material";

const AllOrders = ({ orders }) => {

  let date = 12;
  const [type, setType] = useState('')
  const [status, setStatus] = useState('unshipped')

  const handleRadioChange = (event) => {
    setType(event.target.name)
  }

  const handleChange = (event) => {
    setStatus(event.target.name)
  }

  return (
    <BaseCard title="All orders">
      <div className='overflow-x-auto'>
        <Stack spacing={2}>
          {/* <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Payment Category</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group">
              <div className='flex flex-col lg:flex-row '>
                <FormControlLabel
                  value='Payment Successful'
                  control={<Radio />}
                  label="Payment Successful"
                  name="Payment Successful"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value='Initiated'
                  control={<Radio />}
                  label="Initiated"
                  name="Initiated"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value='Pending'
                  control={<Radio />}
                  label="Pending"
                  name="Pending"
                  onChange={handleRadioChange}
                />
              </div>
            </RadioGroup>
          </FormControl> */}
          {<FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Delivery Category</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group">
              <div className='flex flex-col lg:flex-row '>
                <FormControlLabel
                  value='dispatched'
                  control={<Radio />}
                  label="Dispatched"
                  name="dispatched"
                  onChange={handleChange}
                />
                <FormControlLabel
                  value='unshipped'
                  control={<Radio />}
                  label="Unshipped"
                  name="unshipped"
                  onChange={handleChange}
                />
              </div>
            </RadioGroup>
          </FormControl>}
        </Stack>
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
                  Order Date
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Payment Status
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Order Id
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  name
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  email
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography color="textSecondary" variant="h6">
                  Amount
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              order.status == 'Payment Successful' && order.deliveryStatus == status && <TableRow key={order._id}>
                <TableCell align="center">
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {date && (date = new Date(order.createdAt)) && date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {order.status}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: "500",
                      color: "blue",
                    }}
                  >
                    <Link href={'/adminpanel_lesoft/orderstatus?id=' + order._id}>{order.orderId}</Link>
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {order.name ? order.name : "ABC DEF IJK"}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: "500",
                    }}
                  >
                    {order.email ? order.email : "xyz@gmail.com"}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">₹{order.amount}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </BaseCard>
  );
};

export default AllOrders;
