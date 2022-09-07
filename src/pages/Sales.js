import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
import SalesConceptosService from '../services/VentasConceptosService'

export default function Sales() {
    const [rows, setRows] = useState([]);
    const [conceptRows, setConceptRows] = useState([]);
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
    const [selection, setSelection] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [totalPesos, setTotalPesos] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [totalUSD, setTotalUSD] = useState('Total USD');
    const [observations, setObservations] = useState('');

    const [errorFolio, setErrorFolio] = useState(false);
    const [errorClient, setErrorClient] = useState(false);
    const [errorInv, setErrorInv] = useState(false);
    const [errorObs, setErrorObs] = useState(false);

    const re_folio = /^REM-[0-9]+$|^FAC\s[A-Z]\d+$/;
    const re_UpperCase = /^(([A-Z]+\s?)+)?$/;
    const re_Digit = /^\d+$|N\/A/

    const hideUnitsArr = ['N/A', 'PIECE', 'SIDE', 'WHOLE HIDE', 'DOUBLE SHOULDER', 'DOUBLE BUTT', 'DOUBLE BEND', 'BELLY'];
    const unitsArr = ['N/A', 'DM', 'SQFT', 'KG']
    const selectionArr = ['N/A', 'TR', 'TR1', 'TR2', 'TR3', 'TR4', 'OFF SHAPE', 'CONSERVATION PROBLEM'];
    const typeArr = ['SMALL PACKER', 'PACKER', 'BULL', 'HEAVY NATIVE STEER', 'DAIRY COW', 'COLORADO STEER', 'DEER SKIN'];

    useEffect((rows) => {
        SalesService.getSales().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                console.log(rows);
            }
        });
        SalesConceptosService.getSalesConceptos().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setConceptRows(response.data);
                console.log(rows);
            }
        });
    }, [])

    const handleOpenNew = () => {
        setOpenNew(true);
    };

    const handleCloseNew = () => {
        setOpenNew(false);
        setErrorClient(false);
        setErrorFolio(false);
        setErrorInv(false);
        setErrorObs(false);
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

    const handleSelectionChange = (event) => {
        setSelection(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleTotalPesosChange = (event) => {
        setTotalPesos(event.target.value);
    };

    const handleExchangeRateChange = (event) => {
        setExchangeRate(event.target.value);
        setTotalUSD(totalPesos * event.target.value)
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
        if (re_folio.test(folio) === false) {
            setErrorFolio(true);
        } else if (re_UpperCase.test(client) === false) {
            setErrorFolio(false);
            setErrorClient(true);
        } else if (re_UpperCase.test(observations) === false) {
            setErrorFolio(false);
            setErrorClient(false);
            setErrorObs(true);
        } else if (re_Digit.test(inv) === false) {
            setErrorFolio(false)
            setErrorClient(false);
            setErrorObs(false);
            setErrorInv(true);
        } else {
            setErrorObs(false);
            setErrorFolio(false);
            setErrorInv(false);
            setErrorClient(false);
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
                selection: selection,
                type: type,
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
            width: 200,
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
            headerName: 'Unit',
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
            field: 'selection',
            width: 150,
            headerName: 'Selection',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'type',
            width: 150,
            headerName: 'Type',
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
                                <FormControl required margin='dense' sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Concept</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={concept}
                                        label="Concept"
                                        onChange={handleConceptChange}
                                    >
                                        {conceptRows.map((concept) => (
                                            <MenuItem value={concept.concept}>{concept.concept}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="inv" label="Inv" type="text" variant="standard" onChange={handleInvChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="pieces" label="Pieces" type="number" variant="standard" onChange={handlePiecesChange} />
                            </ListItem>
                            <ListItem>
                                <FormControl required margin='dense' sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={wholeHideSides}
                                        label="Unit"
                                        onChange={handleWholeHideSidesChange}
                                    >
                                        {hideUnitsArr.map((unit) => (
                                            <MenuItem value={unit}>{unit}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="quantity" label="Quantity" type="number" variant="standard" onChange={handleQuantityChange} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <FormControl required margin='dense' sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={unit}
                                        label="Unit"
                                        onChange={handleUnitChange}
                                    >
                                        {unitsArr.map((unit) => (
                                            <MenuItem value={unit}>{unit}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <FormControl required margin='dense' sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Selection</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selection}
                                        label="Unit"
                                        onChange={handleSelectionChange}
                                    >
                                        {selectionArr.map((selection) => (
                                            <MenuItem value={selection}>{selection}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ListItem>
                            <ListItem>
                                <FormControl required margin='dense' sx={{ width: '100%' }}>
                                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={type}
                                        label="Unit"
                                        onChange={handleTypeChange}
                                    >
                                        {typeArr.map((type) => (
                                            <MenuItem value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
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
                                <TextField autoFocus disabled placeholder='Total USD' value={totalUSD} margin="dense" id="totalUsd" />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="observations" label="Observations" type="text" variant="standard" onChange={handleObservationsChange} />
                            </ListItem>
                        </List>
                    </div>
                    {errorFolio ? <Alert severity='error'>El folio introducido no cumple con el formato "REM-123" / "FAC X123"</Alert> : <></>}
                    {errorClient ? <Alert severity='error'>El cliente debe ser en MAYUSCULAS </Alert> : <></>}
                    {errorInv ? <Alert severity='error'>El id de inventario debe ser digitos unicamente </Alert> : <></>}
                    {errorObs ? <Alert severity='error'>Las observaciones deben ser en MAYUSCULAS </Alert> : <></>}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={newSale}>Accept</Button>
                    <Button variant="contained" onClick={handleCloseNew}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
