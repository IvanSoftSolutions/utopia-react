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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
    const [dateArrival, setDateArrival] = useState('');
    const [openShipment, setOpenShipment] = useState(false);
    const [dateShipment, setDateShipment] = useState('');
    const [serial, setSerial] = useState(0);
    const [details, setDetails] = useState('');
    const [id, setId] = useState(0);
    const [aux, setAux] = useState(false);

    useEffect((rows) => {
        ShipmentService.getShipments().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                // console.log(rows);
            }
        });
    }, [aux])

    function updateDoA() {
        if (dateArrival !== '' && id !== 0) {
            let data = {
                id: id,
                date: dateArrival
            }
            ShipmentService.updateShipment(data).then(response => {
                if (response.status === 200) {
                    setAux(!aux);
                    console.log('simon')
                } else {
                    console.log('nel')
                }
            })
        } else {
            console.log('nel')
        }
    }

    function newShipment() {
        let data = {
            sNumber: serial,
            details: details,
            shipped: 1,
            shipDate: dateShipment.toString(),
            received: 0,
            arriveDate: ''
        }
        console.log(data);
        ShipmentService.postShipment(data).then(response => {
            if (response.status === 200) {
                setAux(!aux)
                console.log('simon');
                console.log(response.data)
            } else {
                console.log('nel')
            }
        })
    }

    const handleClickOpenDoA = (shipmentId) => {
        setOpenDoA(true);
        setId(shipmentId);
        console.log(shipmentId);
    };

    const handleAcceptDoA = () => {
        setOpenDoA(false);
        updateDoA();
    }

    const handleCloseDoA = () => {
        setOpenDoA(false);
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

    const handleDetailsChange = (event) => {
        setDetails(event.target.value);
    };

    const handleAcceptShipment = () => {
        newShipment();
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
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell>{row.sNumber}</TableCell>
                                <TableCell>{row.details}</TableCell>
                                <Checkbox disabled={Boolean(row.shipped)} defaultChecked color="default" />
                                <TableCell>{row.shipDate}</TableCell>
                                <Checkbox disabled={Boolean(row.received)} checked={Boolean(row.received)} onChange={() => handleClickOpenDoA(row.id)} color="default" />
                                <TableCell>{row.arriveDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleOpenShipment} >Add shipment</Button>
            <Dialog open={openShipment} onClose={handleCloseShipment}>
                <DialogTitle>New Shipment</DialogTitle>
                <DialogContent>
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introduce shipment's data
                    </DialogContentText>
                    <List>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="date"
                                type="Date"
                                variant="standard"
                                onChange={handleDateShipmentChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="serial"
                                label="Serial Number"
                                variant="standard"
                                onChange={handleSerialChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="details"
                                label="Details"
                                type="text"
                                variant="standard"
                                onChange={handleDetailsChange}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleCloseShipment}>Cancel</Button>
                    <Button variant="contained" onClick={() => {
                        handleAcceptShipment()
                    }}>Accept</Button>
                </DialogActions>
            </Dialog>
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
                    <Button variant="contained" onClick={handleCloseDoA}>Cancel</Button>
                    <Button variant="contained" onClick={() => {
                        handleAcceptDoA()
                    }}>Accept</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
