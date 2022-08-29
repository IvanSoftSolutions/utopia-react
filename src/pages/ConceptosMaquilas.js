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

import ConceptosMaquilasService from '../services/MaquilasConceptosService';

export default function ConceptosVentas() {
    const [rows, setRows] = useState([]);
    const [openNew, setOpenNew] = React.useState(false);

    const [concept, setConcept] = useState('');
    const [unit, setUnit] = useState('');
    const [type, setType] = useState(0);
    const [price, setPrice] = useState('');

    useEffect((rows) => {
        ConceptosMaquilasService.getConceptosMaquilas().then(response => {
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

    const handleConceptChange = (event) => {
        setConcept(event.target.value);
    };

    const handleUnitChange = (event) => {
        setUnit(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };


    function updateConceptoVenta(params, event) {
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
        ConceptosMaquilasService.ConceptosMaquilaUpdate(data).then(response => {
            if (response.status === 200) {
                console.log(response);
                console.log('simon')
            } else {
                console.log('nel')
            }
        })
    }

    function newConcept() {
        let data = {
            concept: concept,
            unit: unit,
            type: type,
            price: price
        }
        ConceptosMaquilasService.newConceptosMaquila(data).then(response => {
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
            field: 'concept',
            width: 150,
            headerName: 'Concepto',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'unit',
            width: 150,
            headerName: 'Unidad',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'type',
            width: 150,
            headerName: 'Tipo',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'price',
            width: 150,
            headerName: 'Precio',
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
                        updateConceptoVenta(params, event)
                    }} />
            </Box>
            <Button variant="contained" onClick={handleOpenNew}>Nuevo Concepto</Button>
            <Dialog open={openNew} onClose={handleCloseNew} >
                <DialogTitle>Nuevo concepto</DialogTitle>
                <DialogContent >
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introducir informacion de concepto
                    </DialogContentText>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <List >
                            <ListItem>
                                <TextField autoFocus margin="dense" id="concept" label="Concepto" type="text" variant="standard" onChange={handleConceptChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="unit" label="Unidad" type="text" variant="standard" onChange={handleUnitChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="type" label="Tipo" type="text" variant="standard" onChange={handleTypeChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="price" label="Precio" type="text" variant="standard" onChange={handlePriceChange} />
                            </ListItem>
                        </List>
                    </div>
                    {/* {error ? <Alert severity='error'>Something went wrong</Alert> : <></>} */}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={newConcept}>Accept</Button>
                    <Button variant="contained" onClick={handleCloseNew}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
