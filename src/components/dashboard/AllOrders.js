import React, { useState, useEffect} from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import Link from 'next/link'

const AllOrders = ({ orders }) => {

    let date=12;

  return (
      <BaseCard title="All orders">
        <div className='overflow-x-auto'>
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
                Date
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
            <TableRow key={order._id}>
              <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {date && (date = new Date(order.createdAt) )&& date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: "500",
                  }}
                >
                  {order.status ? order.status : "Initiated"}
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
                  <Link href={'/admin/orderstatus?id='+order._id}>{order.orderId}</Link>
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
