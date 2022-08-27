import React from 'react';
import Alert from '@mui/material/Alert';
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
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import HidesInvService from '../services/HidesInvService';

export default function HidesInv() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [article, setArticle] = React.useState('');
    const [color, setColor] = React.useState('');
    const [type, setType] = React.useState('');
    const [kind, setKind] = React.useState('');
    const [wholesHide, setWholesHide] = React.useState(0);
    const [sides, setSides] = React.useState(0);
    const [shrunkenShoulder, setShrunkenShoulder] = React.useState(0);
    const [doubleButt, setDoubleButt] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [grade, setGrade] = React.useState('');
    const [ubicacion, setUbicacion] = React.useState('');
    const [pallet, setPallet] = React.useState(0);
    const [location, setLocation] = React.useState('');
    const [costHide, setCostHide] = React.useState(0);
    const [piecesCost, setPiecesCost] = React.useState(0);
    const [fungus, setFungus] = React.useState('');
    const [shaved, setShaved] = React.useState('');
    const [thickness, setThickness] = React.useState('');
    const [washed, setWashed] = React.useState('');
    const [rejects, setRejects] = React.useState('');
    const [isPallet, setIsPallet] = React.useState('');
    const [upoTruck, setUpoTruck] = React.useState('');
    const [date, setDate] = React.useState('');
    const [reviewer, setReviewer] = React.useState('');
    const [observations, setObservations] = React.useState('');
    const [modificationSales, setModificationSales] = React.useState('');
    const [reviewed, setReviewed] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    // Get Hides Inventory data on load
    useEffect((rows) => {
        HidesInvService.getHidesInv().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                console.log(rows);
            }
        });
    }, [])

    const handleArticleChange = (event) => {
        setArticle(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleKindChange = (event) => {
        setKind(event.target.value);
    };

    const handleWholesHideChange = (event) => {
        setWholesHide(event.target.value);
    };

    const handleSidesChange = (event) => {
        setSides(event.target.value);
    };

    const handleShrunkenShoulderChange = (event) => {
        setShrunkenShoulder(event.target.value);
    };

    const handleDoubleButtChange = (event) => {
        setDoubleButt(event.target.value);
    };

    const handleTotalChange = (event) => {
        setTotal(event.target.value);
    };

    const handleGradeChange = (event) => {
        setGrade(event.target.value);
    };

    const handleUbicacionChange = (event) => {
        setUbicacion(event.target.value);
    };

    const handlePalletChange = (event) => {
        setPallet(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleCostHideChange = (event) => {
        setCostHide(event.target.value);
    };

    const handlePiecesCostChange = (event) => {
        setPiecesCost(event.target.value);
    };

    const handleFungusChange = (event) => {
        setFungus(event.target.value);
    };

    const handleShavedChange = (event) => {
        setShaved(event.target.value);
    };

    const handleThicknessChange = (event) => {
        setThickness(event.target.value);
    };

    const handleWashedChange = (event) => {
        setWashed(event.target.value);
    };

    const handleRejectsChange = (event) => {
        setRejects(event.target.value);
    };

    const handleIsPalletChange = (event) => {
        setIsPallet(event.target.value);
    };

    const handleUpoTruckChange = (event) => {
        setUpoTruck(event.target.value);
    };

    const handleDateChange = (event) => {
        setDate(event.target.value);
    };

    const handleReviewerChange = (event) => {
        setReviewer(event.target.value);
    };

    const handleObservationsChange = (event) => {
        setObservations(event.target.value);
    };

    const handleModificationSalesChange = (event) => {
        setModificationSales(event.target.value);
    };

    const handleReviewedChange = (event) => {
        setReviewed(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setSuccess(false);
    };

    const handleClose = () => {
        setError(false);
        setOpen(false);
    };

    function postPallet() {
        let data = {
            article: article,
            color: color,
            type: type,
            kind: kind,
            wholesHide: wholesHide,
            sides: sides,
            shrunkenShoulder: shrunkenShoulder,
            doubleButt: doubleButt,
            total: total,
            grade: grade,
            ubicacion: ubicacion,
            pallet: pallet,
            location: location,
            costHide: costHide,
            piecesCost: piecesCost,
            fungus: fungus,
            shaved: shaved,
            thickness: thickness,
            washed: washed,
            rejects: rejects,
            isPallet: isPallet,
            upoTruck: upoTruck,
            date: date,
            reviewer: reviewer,
            observations: observations,
            modificationSales: modificationSales,
            reviewed: reviewed
        }
        if (article !== '') {
            HidesInvService.postPallet(data).then(response => {
                if (response.status === 200) {
                    setSuccess(true);
                    setError(false);
                    console.log(response.data);
                } else {
                    setSuccess(false);
                    setError(true);
                    console.log('nel')
                }
            })
        } else {
            setSuccess(false);
            setError(true);
        }

    }

    const headCells = [
        {
            field: 'id',
            headerName: 'Id',
        },
        {
            field: 'pallet',
            headerName: 'Pallet',
        },
        {
            field: 'upoTruck',
            headerName: 'UPO/Truck',
        },
        {
            field: 'article',
            headerName: 'Article',
        },
        {
            field: 'color',
            headerName: 'Color',
        },
        {
            field: 'type',
            headerName: 'Type',
        },
        {
            field: 'kind',
            headerName: 'Kind',
        },
        {
            field: 'wholesHide',
            headerName: 'Wholes Hide',
        },
        {
            field: 'sides',
            headerName: 'Sides',
        },
        {
            field: 'shrunkenShoulder',
            headerName: 'Shrunken Shoulder',
        },
        {
            field: 'doubleButt',
            headerName: 'Double Butt',
        },
        {
            field: 'total',
            headerName: 'Total',
        },
        {
            field: 'grade',
            headerName: 'Grade',
        },
        {
            field: 'ubicacion',
            headerName: 'Ubicacion',
        },

        {
            field: 'location',
            headerName: 'Location',
        },
        {
            field: 'costHide',
            headerName: 'Cost Per Hide',
        },
        {
            field: 'piecesxcost',
            headerName: 'Pieces x Cost',
        },
        {
            field: 'date',
            headerName: 'Date',
        },
        {
            field: 'observations',
            headerName: 'Observations',
        },
    ];

    return (
        <>
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid rows={rows} columns={headCells} components={{ Toolbar: GridToolbar }} />
            </Box>
            {success ? <Alert severity='success'>Pallet info successfully stored in database</Alert> : <></>}
            <div>
                <Button variant='contained' onClick={handleClickOpen}>Agregar</Button>
            </div>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Add pallet</DialogTitle>
                <DialogContent >
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introduce new pallet info
                    </DialogContentText>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <List >
                            <ListItem>
                                <TextField autoFocus margin="dense" id="article" label="Article" type="text" variant="standard" onChange={handleArticleChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="color" label="Color" type="text" variant="standard" onChange={handleColorChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="type" label="Type" type="text" variant="standard" onChange={handleTypeChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="kind" label="Kind" type="text" variant="standard" onChange={handleKindChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="wholesHide" label="Wholes Hide" type="number" variant="standard" onChange={handleWholesHideChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="sides" label="Sides" type="number" variant="standard" onChange={handleSidesChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="shrunkenShoulder" label="Shrunken Shoulder" type="number" variant="standard" onChange={handleShrunkenShoulderChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="doubleButt" label="Double Butt" type="number" variant="standard" onChange={handleDoubleButtChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="total" label="Total" type="number" variant="standard" onChange={handleTotalChange} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="grade" label="Grade" type="text" variant="standard" onChange={handleGradeChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="ubicacion" label="Ubicacion" type="text" variant="standard" onChange={handleUbicacionChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="pallet" label="Pallet" type="number" variant="standard" onChange={handlePalletChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="location" label="Location" type="text" variant="standard" onChange={handleLocationChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="costHide" label="Cost per hide" type="number" variant="standard" onChange={handleCostHideChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="piecesCost" label="Pieces x Cost" type="number" variant="standard" onChange={handlePiecesCostChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="fungus" label="Fungus" type="text" variant="standard" onChange={handleFungusChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="shaved" label="Shaved" type="text" variant="standard" onChange={handleShavedChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="thickness" label="Thickness" type="text" variant="standard" onChange={handleThicknessChange} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="washed" label="Washed" type="text" variant="standard" onChange={handleWashedChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="rejects" label="Rejects" type="text" variant="standard" onChange={handleRejectsChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="isPallet" label="Is ir really the pallet at Warehouse A/B?" type="text" variant="standard" onChange={handleIsPalletChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="upoTruck" label="UPO/Truck" type="text" variant="standard" onChange={handleUpoTruckChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="date" label="Date" type="text" variant="standard" onChange={handleDateChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="reviewer" label="Reviewer" type="text" variant="standard" onChange={handleReviewerChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="observations" label="Observations" type="text" variant="standard" onChange={handleObservationsChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="modificationSales" label="Modification/Sales" type="text" variant="standard" onChange={handleModificationSalesChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="reviewed" label="Reviewed" type="text" variant="standard" onChange={handleReviewedChange} />
                            </ListItem>
                        </List>
                    </div>
                    {error ? <Alert severity='error'>Something went wrong</Alert> : <></>}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                    <Button variant="contained" onClick={postPallet}>Accept </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
