import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

import ShipmentService from '../services/ShipmentService';

export default function Shipment() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect((rows) => {
        ShipmentService.getShipments().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                console.log(rows);
            }
        });
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Serial Number</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell>Shipped</TableCell>
                            <TableCell>Shipping Date</TableCell>
                            <TableCell>Received</TableCell>
                            <TableCell>Date of Arrival</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>{row.sNumber}</TableCell>
                                <TableCell>{row.details}</TableCell>
                                {row.shipped === 1 ? <Checkbox disabled defaultChecked color="default" /> : <Checkbox />}
                                <TableCell>{row.shipDate}</TableCell>
                                {row.received === 1 ? <Checkbox defaultChecked color="default" /> : <Checkbox />}
                                <TableCell>{row.arriveDate}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="text" onClick={handleClickOpen}>Add shipment</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Authorization needed</DialogTitle>
                <DialogContent>
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introduce User and Password for authorization
                    </DialogContentText>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="user"
                            label="User"
                            type="email"
                            variant="standard"

                        />
                    </div>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="pasword"
                            variant="standard"

                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose()
                    }}>Accept</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
