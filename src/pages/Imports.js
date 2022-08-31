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

import ImportsService from '../services/ImportsService';

export default function Imports() {
    const [rows, setRows] = useState([]);
    const [openNew, setOpenNew] = React.useState(false);

    const [factura, setFactura] = useState('');
    const [contrato, setContrato] = useState('');
    const [no, setNo] = useState('');
    const [camion, setCamion] = useState('');
    const [kind, setKind] = useState('');
    const [pallets, setPallets] = useState(0);
    const [valorUsd, setValorUsd] = useState(0);
    const [hides, setHides] = useState(0);
    const [weight, setWeight] = useState(0);
    const [eta, setEta] = useState('');
    const [truck, setTruck] = useState('');
    const [insurance, setInsurance] = useState('');
    const [maquila, setMaquila] = useState('');
    const [partida, setPartida] = useState('');
    const [entrada, setEntrada] = useState('');
    const [split, setSplit] = useState('');
    const [final, setFinal] = useState('');
    const [remojo, setRemojo] = useState('');
    const [dividido, setDividido] = useState('');
    const [entrega, setEntrega] = useState('');
    const [type, setType] = useState('');
    const [observations, setObservations] = useState('');
    const [costoProceso, setCostoProceso] = useState(0);
    const [facturaPagada, setFacturaPagada] = useState('');
    const [nFactura, setNFactura] = useState('');

    useEffect((rows) => {
        ImportsService.getImports().then(response => {
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

    const handleFacturaChange = (event) => {
        setFactura(event.target.value);
    };

    const handleContratoChange = (event) => {
        setContrato(event.target.value);
    };

    const handleNoChange = (event) => {
        setNo(event.target.value);
    };

    const handleCamionChange = (event) => {
        setCamion(event.target.value);
    };

    const handleKindChange = (event) => {
        setKind(event.target.value);
    };

    const handlePalletsChange = (event) => {
        setPallets(event.target.value);
    };

    const handleValorUsdChange = (event) => {
        setValorUsd(event.target.value);
    };

    const handleHidesChange = (event) => {
        setHides(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleEtaChange = (event) => {
        setEta(event.target.value);
    };

    const handleTruckChange = (event) => {
        setTruck(event.target.value);
    };

    const handleInsuranceChange = (event) => {
        setInsurance(event.target.value);
    };

    const handleMaquilaChange = (event) => {
        setMaquila(event.target.value);
    };

    const handlePartidaChange = (event) => {
        setPartida(event.target.value);
    };

    const handleEntradaChange = (event) => {
        setEntrada(event.target.value);
    };

    const handleSplitChange = (event) => {
        setSplit(event.target.value);
    };

    const handleFinalChange = (event) => {
        setFinal(event.target.value);
    };

    const handleRemojoChange = (event) => {
        setRemojo(event.target.value);
    };

    const handleDivididoChange = (event) => {
        setDividido(event.target.value);
    };

    const handleEntregaChange = (event) => {
        setEntrega(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleObservationsChange = (event) => {
        setObservations(event.target.value);
    };

    const handleCostoProcesoChange = (event) => {
        setCostoProceso(event.target.value);
    };

    const handleFacturaPagadaChange = (event) => {
        setFacturaPagada(event.target.value);
    };

    const handleNFacturaChange = (event) => {
        setNFactura(event.target.value);
    };

    function updateImport(params, event) {
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
        ImportsService.ImportUpdate(data).then(response => {
            if (response.status === 200) {
                console.log(response);
                console.log('simon')
            } else {
                console.log('nel')
            }
        })
    }

    function newImport() {
        let data = {
            factura: factura,
            contrato: contrato,
            no: no,
            camion: camion,
            kind: kind,
            pallets: pallets,
            valorUsd: valorUsd,
            hides: hides,
            weight: weight,
            eta: eta,
            truck: truck,
            insurance: insurance,
            maquila: maquila,
            partida: partida,
            entrada: entrada,
            split: split,
            final: final,
            remojo: remojo,
            dividido: dividido,
            entrega: entrega,
            type: type,
            observations: observations,
            costoProceso: costoProceso,
            facturaPagada: facturaPagada,
            nFactura: nFactura
        }
        ImportsService.newImport(data).then(response => {
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
            field: 'factura',
            width: 100,
            headerName: 'Factura',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'contrato',
            width: 100,
            headerName: 'Contrato',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'no',
            width: 50,
            headerName: 'No',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'camion',
            width: 200,
            headerName: 'Camion',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'kind',
            width: 250,
            headerName: 'Kind',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'pallets',
            width: 100,
            headerName: 'Pallets',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'valorUsd',
            width: 100,
            headerName: 'Valor USD',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'hides',
            width: 100,
            headerName: 'Hides',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'weight',
            width: 100,
            headerName: 'Weight',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'eta',
            width: 100,
            headerName: 'ETA',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'truck',
            width: 50,
            headerName: 'Truck',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'insurance',
            width: 150,
            headerName: 'Insurance',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'maquila',
            width: 125,
            headerName: 'Maquila',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'partida',
            width: 100,
            headerName: 'Partida',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'entrada',
            width: 100,
            headerName: 'Entrada',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'split',
            width: 80,
            headerName: 'Split',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'final',
            width: 80,
            headerName: 'Final',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'remojo',
            width: 100,
            headerName: 'Remojo',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'dividido',
            width: 100,
            headerName: 'Dividido',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'entrega',
            width: 100,
            headerName: 'Entrega',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'type',
            width: 200,
            headerName: 'Type',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'observations',
            width: 400,
            headerName: 'Observations',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'costoProceso',
            width: 150,
            headerName: 'Costo Proceso',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'facturaPagada',
            width: 50,
            headerName: 'Factura Pagada',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'nFactura',
            width: 100,
            headerName: 'Numero Factura',
            valueGetter: handleNullValue,
            editable: true
        }

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
                        updateImport(params, event)
                    }} />
            </Box>
            <Button variant="contained" onClick={handleOpenNew}>Nueva Venta</Button>
            <Dialog open={openNew} onClose={handleCloseNew} >
                <DialogTitle>New import</DialogTitle>
                <DialogContent >
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introduce new import info
                    </DialogContentText>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <List >
                            <ListItem>
                                <TextField autoFocus margin="dense" id="factura" label="Factura" type="text" variant="standard" onChange={handleFacturaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="contrato" type="date" variant="standard" onChange={handleContratoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="no" label="No" type="text" variant="standard" onChange={handleNoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="camion" label="Camion" type="text" variant="standard" onChange={handleCamionChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="kind" label="Kind" type="text" variant="standard" onChange={handleKindChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="pallets" label="Pallets" type="number" variant="standard" onChange={handlePalletsChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="valorUsd" label="Valor USD" type="text" variant="standard" onChange={handleValorUsdChange} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="hides" label="Hides" type="number" variant="standard" onChange={handleHidesChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="weight" label="Weight" type="text" variant="standard" onChange={handleWeightChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="eta" label="Eta" type="number" variant="standard" onChange={handleEtaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="truck" label="Truck" type="number" variant="standard" onChange={handleTruckChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="insurance" label="Insurance" type="number" variant="standard" onChange={handleInsuranceChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="maquila" label="Maquila" type="number" variant="standard" onChange={handleMaquilaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="partida" label="Partida" type="number" variant="standard" onChange={handlePartidaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="entrada" label="entrada" type="text" variant="standard" onChange={handleEntradaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="split" label="Split" type="text" variant="standard" onChange={handleSplitChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="final" label="Final" type="text" variant="standard" onChange={handleFinalChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="remojo" label="Remojo" type="text" variant="standard" onChange={handleRemojoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="dividido" label="Dividido" type="text" variant="standard" onChange={handleDivididoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="entrega" label="Entrega" type="text" variant="standard" onChange={handleEntregaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="type" label="Type" type="text" variant="standard" onChange={handleTypeChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="observations" label="Observations" type="text" variant="standard" onChange={handleObservationsChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="costoProceso" label="Costo Proceso" type="text" variant="standard" onChange={handleCostoProcesoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="facturaPagada" label="Factura Pagada" type="text" variant="standard" onChange={handleFacturaPagadaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="nFactura" label="Numero Factura" type="text" variant="standard" onChange={handleNFacturaChange} />
                            </ListItem>
                        </List>
                    </div>
                    {/* {error ? <Alert severity='error'>Something went wrong</Alert> : <></>} */}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={newImport}>Accept</Button>
                    <Button variant="contained" onClick={handleCloseNew}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
