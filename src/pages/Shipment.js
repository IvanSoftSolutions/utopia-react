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
    const [openDoA, setOpenDoA] = useState(false);
    const [checked, setChecked] = useState(false);
    const [dateArrival, setDateArrival] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [openShipment, setOpenShipment] = useState(false);
    const [dateShipment, setDateShipment] = useState('');
    const [serial, setSerial] = useState(0);
    const [id, setId] = useState(0);

    useEffect((rows) => {
        ShipmentService.getShipments().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                // console.log(rows);
            }
        });
    }, [])

    function updateDoA() {
        if (dateArrival !== '' && id !== 0) {
            ShipmentService.updateShipment(id, dateArrival)
        } else {
            console.log('nel')
        }
    }

    const handleClickOpenDoA = (shipmentId) => {
        setOpenDoA(true);
        setChecked(true);
        setId(shipmentId);
        console.log(shipmentId);
    };

    const handleAcceptDoA = () => {
        setOpenDoA(false);
        setChecked(true);
        setDisabled(true);
        updateDoA();
    }

    const handleCloseDoA = () => {
        setOpenDoA(false);
        setChecked(false);
    };

    const handleDoAChange = (event) => {
        setDateArrival(event.target.value);
    };

    const handleOpenShipment = () => {
        setOpenShipment(true);
    }

    const handleCloseShipment = () => {
        setOpenShipment(false);
    }

    const handleDateShipmentChange = (event) => {
        setDateShipment(event.target.value);
    };

    const handleSerialChange = (event) => {
        setSerial(event.target.value);
    };

    const handleAcceptShipment = () => {
        setOpenShipment(false);
    };

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
                            row.received === 1 ?
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell>{row.sNumber}</TableCell>
                                    <TableCell>{row.details}</TableCell>
                                    <Checkbox disabled defaultChecked color="default" />
                                    <TableCell>{row.shipDate}</TableCell>
                                    <Checkbox disabled defaultChecked color="default" />
                                    <TableCell>{row.arriveDate}</TableCell>
                                </TableRow> :
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell>{row.sNumber}</TableCell>
                                    <TableCell>{row.details}</TableCell>
                                    <Checkbox disabled defaultChecked color="default" />
                                    <TableCell>{row.shipDate}</TableCell>
                                    <Checkbox disabled={disabled} checked={checked} onChange={() => handleClickOpenDoA(row.id)} color="default" />
                                    <TableCell>{row.arriveDate}</TableCell>
                                </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="text" onClick={handleOpenShipment} >Add shipment</Button>
            <Dialog open={openDoA} onClose={handleCloseDoA}>
                <DialogTitle>Date of arrival</DialogTitle>
                <DialogContent>
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introduce shipment's date of arrival
                    </DialogContentText>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            type="Date"
                            variant="standard"
                            onChange={handleDoAChange}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDoA}>Cancel</Button>
                    <Button onClick={() => {
                        handleAcceptDoA()
                    }}>Accept</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openShipment} onClose={handleCloseShipment}>
                <DialogTitle>New Shipment</DialogTitle>
                <DialogContent>
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introduce shipment's data
                    </DialogContentText>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="serial"
                            label="Serial Number"
                            variant="standard"
                            onChange={handleDateShipmentChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="date"
                            type="Date"
                            variant="standard"
                            onChange={handleSerialChange}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseShipment}>Cancel</Button>
                    <Button onClick={() => {
                        handleAcceptShipment()
                    }}>Accept</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
