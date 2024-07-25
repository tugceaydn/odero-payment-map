// src/components/MerchantTable.js

import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import "./MerchantTable.scss";

export default function MerchantTable() {
  const [merchantTotals, setMerchantTotals] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8080/merchantData"); // Change to your WebSocket URL

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMerchantTotals(data);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  return (
    <TableContainer component={Paper} className="container">
      <Table aria-label="simple table" className="table">
        <TableHead>
          <TableRow>
            <TableCell>Merchant</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(merchantTotals).map(([merchant, total]) => (
            <TableRow
              key={merchant}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {merchant}
              </TableCell>
              <TableCell align="right">{total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
