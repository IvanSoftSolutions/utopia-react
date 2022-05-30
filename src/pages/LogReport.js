import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

import LogService from '../services/LogService';

export default function LogReport() {
    const [rows, setRows] = useState([]);

    useEffect((rows) => {
        LogService.getLogs().then(response => {
            if (response.status === 200) {
                // console.log(response.data);
                setRows(response.data);
            }
        });
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Formula</TableCell>
                        <TableCell>Weight</TableCell>
                        <TableCell>Thickness</TableCell>
                        <TableCell>Material</TableCell>
                        <TableCell>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.uName}
                            </TableCell>
                            <TableCell>{row.date}</TableCell>
                            <TableCell>{row.fName}</TableCell>
                            <TableCell>{row.weight}</TableCell>
                            <TableCell>{row.thickness}</TableCell>
                            <TableCell>{row.material}</TableCell>
                            <TableCell>{row.details}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
