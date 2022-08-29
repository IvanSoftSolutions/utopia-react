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

import MaquilaService from '../services/MaquilaService';

export default function Maquilas() {
    const [rows, setRows] = useState([]);
    const [openNew, setOpenNew] = React.useState(false);

    const [folio, setFolio] = useState('');
    const [date, setDate] = useState('');
    const [client, setClient] = useState('');
    const [concept, setConcept] = useState('');
    const [quantity, setQuantity] = useState('');
    const [wholeHideSides, setWholeHideSides] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState('');
    const [coin, setCoin] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [totalUSD, setTotalUSD] = useState('');
    const [observations, setObservations] = useState('');

    useEffect((rows) => {
        MaquilaService.getMaquilas().then(response => {
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

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleWholeHideSidesChange = (event) => {
        setWholeHideSides(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleTotalChange = (event) => {
        setTotal(event.target.value);
    };

    const handleCoinChange = (event) => {
        setCoin(event.target.value);
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
        MaquilaService.maquilaUpdate(data).then(response => {
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
            quantity: quantity,
            wholeHideSides: wholeHideSides,
            price: price,
            total: total,
            coin: coin,
            exchangeRate: exchangeRate,
            totalUsd: totalUSD,
            observations: observations

        }
        MaquilaService.newMaquila(data).then(response => {
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
            field: 'quantity',
            width: 150,
            headerName: 'Quantity',
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
            field: 'price',
            width: 150,
            headerName: 'Price',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'total',
            width: 150,
            headerName: 'Total',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'coin',
            width: 150,
            headerName: 'coin',
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
            <Button variant="contained" onClick={handleOpenNew}>Nueva Maquila</Button>
            <Dialog open={openNew} onClose={handleCloseNew} >
                <DialogTitle>Nueva maquila</DialogTitle>
                <DialogContent >
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introducir informacion de maquila
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
                                <TextField autoFocus margin="dense" id="quantity" label="Quantity" type="number" variant="standard" onChange={handleQuantityChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="wholeHideSides" label="Whole Hide/Sides" type="text" variant="standard" onChange={handleWholeHideSidesChange} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="price" label="Price" type="number" variant="standard" onChange={handlePriceChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="total" label="Total" type="number" variant="standard" onChange={handleTotalChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="coin" label="Coin" type="text" variant="standard" onChange={handleCoinChange} />
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
