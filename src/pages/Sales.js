import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import SalesService from '../services/SalesService';

export default function Sales() {
    const [rows, setRows] = useState([]);
    const [openNew, setOpenNew] = React.useState(false);

    const [folio, setFolio] = useState('');
    const [date, setDate] = useState('');
    const [client, setClient] = useState('');
    const [concept, setConcept] = useState('');
    const [inv, setInv] = useState('');
    const [pieces, setPieces] = useState('');
    const [wholeHideSides, setWholeHideSides] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('');
    const [price, setPrice] = useState('');
    const [totalPesos, setTotalPesos] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [totalUSD, setTotalUSD] = useState('');
    const [observations, setObservations] = useState('');

    useEffect((rows) => {
        SalesService.getSales().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                console.log(rows);
            }
        });
    }, [])

    const handleOpenNew = () => {
        setOpenNew(true);
    };

    const handleCloseNew = () => {
        setOpenNew(false);
    };

    const handleFolioChange = (event) => {
        setFolio(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleClientChange = (event) => {
        setClient(event.target.value);
    };

    const handleConceptChange = (event) => {
        setConcept(event.target.value);
    };

    const handleInvChange = (event) => {
        setInv(event.target.value);
    };

    const handlePiecesChange = (event) => {
        setPieces(event.target.value);
    };

    const handleWholeHideSidesChange = (event) => {
        setWholeHideSides(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleTotalPesosChange = (event) => {
        setTotalPesos(event.target.value);
    };

    const handleExchangeRateChange = (event) => {
        setExchangeRate(event.target.value);
    };

    const handleTotalUSDChange = (event) => {
        setTotalUSD(event.target.value);
    };

    const handleObservationsChange = (event) => {
        setObservations(event.target.value);
    };

    function updateSale(params, event) {
        let x = params.field;
        let value = x.charAt(0).toUpperCase() + x.slice(1);
        let data = {
            id: params.id,
            column: value,
            value: event.target.value
        }
        if (data.value === '') {
            data.value = null;
            // console.log(data.value);
        }
        // console.log(data);
        SalesService.saleUpdate(data).then(response => {
            if (response.status === 200) {
                console.log(response);
                console.log('simon')
            } else {
                console.log('nel')
            }
        })
    }

    function newSale() {
        let data = {
            folio: folio,
            date: date,
            client: client,
            concept: concept,
            inv: inv,
            pieces: pieces,
            wholeHideSides: wholeHideSides,
            quantity: quantity,
            unit: unit,
            price: price,
            totalPesos: totalPesos,
            exchangeRate: exchangeRate,
            totalUsd: totalUSD,
            observations: observations

        }
        SalesService.newSale(data).then(response => {
            if (response.status === 200) {
                console.log(response);
                console.log('simon')
                setOpenNew(false);
            } else {
                console.log(response);
                console.log('nel')
            }
        })
    }

    const headCells = [
        {
            field: 'folio',
            width: 150,
            headerName: 'Folio',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'date',
            width: 150,
            headerName: 'Date',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'client',
            width: 150,
            headerName: 'Client',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'concept',
            width: 150,
            headerName: 'Concept',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'inv',
            width: 150,
            headerName: 'Inv',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'pieces',
            width: 150,
            headerName: 'Pieces',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'wholeHideSides',
            width: 150,
            headerName: 'Whole Hide/Sides',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'quantity',
            width: 150,
            headerName: 'Quantity',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'unit',
            width: 150,
            headerName: 'Unit',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'price',
            width: 150,
            headerName: 'Price',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'totalPesos',
            width: 150,
            headerName: 'Total Pesos',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'exchangeRate',
            width: 150,
            headerName: 'Exchange Rate',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'totalUsd',
            width: 150,
            headerName: 'Total USD',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'observations',
            width: 150,
            headerName: 'Observations',
            valueGetter: handleNullValue,
            editable: true
        },

    ];

    function handleNullValue(params) {
        // console.log(params)
        let name = params.field;
        if (params.row[name] === 'null') {
            return ('');
        } else {
            return (params.row[name]);
        }
    }

    return (
        <>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={headCells}
                    components={{ Toolbar: GridToolbar }}
                    experimentalFeatures={{ newEditingApi: true }}
                    onCellEditStop={(params, event) => {
                        updateSale(params, event)
                    }} />
            </Box>
            <Button variant="contained" onClick={handleOpenNew}>Nueva Venta</Button>
            <Dialog open={openNew} onClose={handleCloseNew} >
                <DialogTitle>Nueva venta</DialogTitle>
                <DialogContent >
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introducir informacion de venta
                    </DialogContentText>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <List >
                            <ListItem>
                                <TextField autoFocus margin="dense" id="folio" label="Folio" type="text" variant="standard" onChange={handleFolioChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="date" type="date" variant="standard" onChange={handleDateChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="client" label="Client" type="text" variant="standard" onChange={handleClientChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="concept" label="Concept" type="text" variant="standard" onChange={handleConceptChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="inv" label="Inv" type="text" variant="standard" onChange={handleInvChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="pieces" label="Pieces" type="number" variant="standard" onChange={handlePiecesChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="wholeHideSides" label="Whole Hide/Sides" type="text" variant="standard" onChange={handleWholeHideSidesChange} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="quantity" label="Quantity" type="number" variant="standard" onChange={handleQuantityChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="unit" label="Unit" type="text" variant="standard" onChange={handleUnitChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="price" label="Price" type="number" variant="standard" onChange={handlePriceChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="totalPesos" label="Total Pesos" type="number" variant="standard" onChange={handleTotalPesosChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="exchangeRate" label="Exchange Rate" type="number" variant="standard" onChange={handleExchangeRateChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="totalUsd" label="Total USD" type="number" variant="standard" onChange={handleTotalUSDChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="observations" label="Observations" type="text" variant="standard" onChange={handleObservationsChange} />
                            </ListItem>
                        </List>
                    </div>
                    {/* {error ? <Alert severity='error'>Something went wrong</Alert> : <></>} */}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={newSale}>Accept</Button>
                    <Button variant="contained" onClick={handleCloseNew}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
