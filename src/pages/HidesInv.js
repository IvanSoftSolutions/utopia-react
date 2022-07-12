import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

import HidesInvService from '../services/HidesInvService';

export default function HidesInv() {
    const [rows, setRows] = useState([]);

    useEffect((rows) => {
        HidesInvService.getHidesInv().then(response => {
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
                        <TableCell>Id</TableCell>
                        <TableCell>Article</TableCell>
                        <TableCell>Color</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Kind</TableCell>
                        <TableCell>Wholes Hide</TableCell>
                        <TableCell>Sides</TableCell>
                        <TableCell>Shrunken Shoulder</TableCell>
                        <TableCell>Double Butt</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Grade</TableCell>
                        <TableCell>Ubicacion</TableCell>
                        <TableCell>Pallet</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Cost Per Hide</TableCell>
                        <TableCell>Pieces x Cost</TableCell>
                        <TableCell>Fungus</TableCell>
                        <TableCell>Shaved</TableCell>
                        <TableCell>Thickness</TableCell>
                        <TableCell>Rejects</TableCell>
                        <TableCell>Is It Really The Pallet At Warehouse A/B?</TableCell>
                        <TableCell>UPO/Truck</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Reviewer</TableCell>
                        <TableCell>Observations</TableCell>
                        <TableCell>Modification/Sales</TableCell>
                        <TableCell>Reviewed</TableCell>
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
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.article}</TableCell>
                                    <TableCell>{row.color}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.kind}</TableCell>
                                    <TableCell>{row.wholesHide}</TableCell>
                                    <TableCell>{row.sides}</TableCell>
                                    <TableCell>{row.shrunkenShoulder}</TableCell>
                                    <TableCell>{row.doubleButt}</TableCell>
                                    <TableCell>{row.total}</TableCell>
                                    <TableCell>{row.grade}</TableCell>
                                    <TableCell>{row.ubicacion}</TableCell>
                                    <TableCell>{row.pallet}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.costHide}</TableCell>
                                    <TableCell>{row.piecesxcost}</TableCell>
                                    <TableCell>{row.fungus}</TableCell>
                                    <TableCell>{row.shaved}</TableCell>
                                    <TableCell>{row.thickness}</TableCell>
                                    <TableCell>{row.rejects}</TableCell>
                                    <TableCell>{row.isPallet}</TableCell>
                                    <TableCell>{row.upoTruck}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.reviewer}</TableCell>
                                    <TableCell>{row.observations}</TableCell>
                                    <TableCell>{row.modificationSales}</TableCell>
                                    <TableCell>{row.reviewed}</TableCell>
                                </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
