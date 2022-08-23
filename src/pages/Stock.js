import React from 'react';
import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import StockService from '../services/StockService';
import InOutService from '../services/InOutService';

const headCells = [
    {
        field: 'id',
        width: 100,
        headerName: 'Id',
    },
    {
        field: 'pName',
        width: 300,
        headerName: 'Name',
    },
    {
        field: 'producer',
        width: 150,
        headerName: 'Producer',
    },
    {
        field: 'presentation',
        width: 150,
        headerName: 'Presentation',
    },
    {
        field: 'qty',
        width: 100,
        headerName: 'Amount',
    },
    {
        field: 'weight',
        width: 100,
        headerName: 'Weight',
    },
    {
        field: 'kg',
        width: 100,
        headerName: 'KG',
    },
    {
        field: 'price',
        width: 100,
        headerName: 'Price',
    },
    {
        field: 'total',
        width: 100,
        headerName: 'Total',
    },
    {
        field: 'currency',
        width: 100,
        headerName: 'Currency',
    }
];

export default function Stock() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openNew, setOpenNew] = React.useState(false);
    const [name, setName] = React.useState('');
    const [producer, setProducer] = React.useState('');
    const [presentation, setPresentation] = React.useState('');
    const [qty, setQty] = React.useState(0);
    const [weight, setWeight] = React.useState(0);
    const [price, setPrice] = React.useState(0);
    const [currency, setCurrency] = React.useState('');

    useEffect((rows) => {
        StockService.getStock().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                console.log(rows);
            }
        });
    }, [open, openNew])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOpenNew = () => {
        setOpenNew(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseNew = () => {
        setOpenNew(false);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleProducerChange = (event) => {
        setProducer(event.target.value);
    };

    const handlePresentationChange = (event) => {
        setPresentation(event.target.value);
    };

    const handleQtyChange = (event) => {
        setQty(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    function addStock() {
        let data = {
            name: name,
            qty: qty
        }
        StockService.addStock(data).then(response => {
            if (response.status === 200) {
                console.log(response);
                console.log('simon')
                setOpen(false);
            } else {
                console.log('nel')
            }
        })
        let inOutData = {
            date: new Date().toLocaleString(),
            prodId: 0,
            qty: qty,
            InOrOut: 'In'
        }
        // console.log(inOutData);
        InOutService.postInOutName(inOutData, name).then(response => {
            if (response.data === 200) {
                // console.log(response.data)
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data)
            }
        })
    }

    function newChemical() {
        let data = {
            pName: name,
            producer: producer,
            presentation: presentation,
            qty: qty,
            weight: weight,
            price: price,
            currency: currency
        }
        StockService.newChemical(data).then(response => {
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

    return (
        <>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid rows={rows.slice(2, -1)} columns={headCells} components={{ Toolbar: GridToolbar }} />
            </Box>
            <div>
                <Button variant='contained' onClick={handleOpenNew}>New chemical</Button>
                <Button variant='contained' onClick={handleClickOpen}>Agregar</Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add chemical stock</DialogTitle>
                <DialogContent>
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introduce chemical's name and quantity
                    </DialogContentText>
                    <List>
                        <ListItem>
                            <FormControl required margin='dense' sx={{ width: '100%' }}>
                                <InputLabel id="demo-simple-select-label">Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={name}
                                    label="Name"
                                    onChange={handleNameChange}
                                >
                                    {rows.map((product) => (
                                        product.id === 1 ? <TableRow></TableRow> : product.id === 2 ? <TableRow></TableRow> :
                                            product.id === 999 ? <TableRow></TableRow> :
                                                <MenuItem value={product.pName}>{product.pName}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="qty"
                                label="Quantity"
                                type="number"
                                variant="standard"
                                onChange={handleQtyChange}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addStock}>Accept</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openNew} onClose={handleCloseNew}>
                <DialogTitle>Add New Chemical</DialogTitle>
                <DialogContent>
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introduce chemical's data
                    </DialogContentText>
                    <List>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                variant="standard"
                                onChange={handleNameChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="producer"
                                label="Producer"
                                type="text"
                                variant="standard"
                                onChange={handleProducerChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="presentation"
                                label="Presentation"
                                type="text"
                                variant="standard"
                                onChange={handlePresentationChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="qty"
                                label="Amount"
                                type="number"
                                variant="standard"
                                onChange={handleQtyChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="weight"
                                label="Weight"
                                type="text"
                                variant="standard"
                                onChange={handleWeightChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="price"
                                label="Price"
                                type="text"
                                variant="standard"
                                onChange={handlePriceChange}
                            />
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="currency"
                                label="Currency"
                                type="text"
                                variant="standard"
                                onChange={handleCurrencyChange}
                            />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNew}>Cancel</Button>
                    <Button onClick={newChemical}>Accept</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
