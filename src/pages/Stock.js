import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

import StockService from '../services/StockService';

export default function Stock() {
    const [rows, setRows] = useState([]);

    useEffect((rows) => {
        StockService.getStock().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                console.log(rows);
            }
        });
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        row.id === 1 ? <TableRow></TableRow> : row.id === 2 ? <TableRow></TableRow> :
                            row.id === 999 ? <TableRow></TableRow> :
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell>{row.pName}</TableCell>
                                    <TableCell>{row.qty}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.qty * row.price}</TableCell>
                                </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
