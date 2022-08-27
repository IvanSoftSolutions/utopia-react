import React from 'react';
import Box from '@mui/material/Box';
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
import { DataGrid, GridToolbar, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';

import ShipmentService from '../services/ShipmentService';

export default function Shipment() {
    const [rows, setRows] = useState([]);
    const [openDoA, setOpenDoA] = useState(false);
    const [dateArrival, setDateArrival] = useState('');
    const [openShipment, setOpenShipment] = useState(false);
    const [dateShipment, setDateShipment] = useState('');
    const [serial, setSerial] = useState(0);
    const [nFactura, setNFactura] = useState('');
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
            arriveDate: '',
            nFactura: nFactura
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

    const handleNFacturaChange = (event) => {
        setNFactura(event.target.value);
    };

    const handleDetailsChange = (event) => {
        setDetails(event.target.value);
    };

    const handleAcceptShipment = () => {
        newShipment();
        setOpenShipment(false);
    };

    function renderShipped(params) {
        return (
            <Checkbox disabled={Boolean(params.row.shipped)} defaultChecked color="default" />
        )
    }

    function renderArrived(params) {
        return (
            <Checkbox disabled={Boolean(params.row.received)} checked={Boolean(params.row.received)} onChange={() => handleClickOpenDoA(params.row.id)} color="default" />
        )
    }

    const headCells = [
        {
            field: 'id',
            width: 50,
            headerName: 'Id',
        },
        {
            field: 'sNumber',
            width: 150,
            headerName: 'Serial Number',
        },
        {
            field: 'nFactura',
            width: 150,
            headerName: 'Numero de Factura',
        },
        {
            field: 'details',
            width: 250,
            headerName: 'Details',
        },
        {
            field: 'shipped',
            headerName: 'Shipped',
            renderCell: renderShipped
        },
        {
            field: 'shipDate',
            width: 150,
            headerName: 'Shipping Date',
        },
        {
            field: 'received',
            headerName: 'Received',
            renderCell: renderArrived
        },
        {
            field: 'arriveDate',
            width: 150,
            headerName: 'Date of Arrival',
        },
    ]

    return (
        <>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={headCells}
                    components={{ Toolbar: GridToolbar }}
                    disableSelectionOnClick
                />
            </Box>
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
                                id="nFactura"
                                label="Numero Factura"
                                type="text"
                                variant="standard"
                                onChange={handleNFacturaChange}
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
