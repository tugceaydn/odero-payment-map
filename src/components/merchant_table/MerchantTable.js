import React, { useEffect, useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './MerchantTable.scss';
import Row from  "./Row";

  

export default function MerchantTable() {
  const [merchantTotals, setMerchantTotals] = useState([]);
  const [subMerchantTotals, setSubMerchantTotals] = useState({});
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080/merchantData'); // Change to your WebSocket URL

    ws.current.onopen = () => {
      console.log('WebSocket connection opened');
    //   ws.current.send('Initial request for data');
    };


    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Received data:', data);
      
      if (data.isSubMerchantData) {
        console.log('Sub Merchant Data');
        if (data.totals && data.merchant) {
          setSubMerchantTotals((prevState) => ({
            ...prevState,
            [data.merchant]: Object.entries(data.totals),
          }));
        } else {
          console.warn('Missing sub-merchant data:', data);
        }
      } else {
        if (data.totals) {
            setMerchantTotals(data.totals.map(entry => ({
                merchantName: entry.merchantName || '',  // Assuming merchantName is a field if needed
                totalAmount: entry.totalAmount,
                totalCount: entry.totalCount,
                hasSubMerchants: entry.hasSubMerchants,
              })));
            }
        else {
          console.warn('Missing merchant data:', data);
        }
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const handleRowClick = (merchant) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(merchant); // Send the merchant name to the backend
    }
  };

  return (
    <TableContainer component={Paper} className="table-container">
      <Table aria-label="collapsible table" className="table">
        <TableHead>
          <TableRow>
            <TableCell className="icon-cell" />
            <TableCell>Üye İş Yeri</TableCell>
            <TableCell align="right">İşlem Sayısı</TableCell>
            <TableCell align="right">İşlem Hacmi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {merchantTotals.map(({ merchantName, totalAmount, totalCount, hasSubMerchants }) => (
            <Row
                key={merchantName}
                merchant={merchantName}
                entry = {{totalAmount, totalCount}}
                hasSubMerchants={hasSubMerchants}
                subMerchants={subMerchantTotals[merchantName] || []}
                handleRowClick={handleRowClick}
            />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
