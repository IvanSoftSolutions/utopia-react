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

import EngrasesService from '../services/EngrasesService';

export default function Engrases() {
    const [rows, setRows] = useState([]);
    const [openNew, setOpenNew] = React.useState(false);

    const [fechaEngrase, setFechaEngrase] = React.useState('');
    const [nCarga, setNCarga] = React.useState('');
    const [cuero, setCuero] = React.useState('');
    const [camionPartida, setCamionPartida] = React.useState('');
    const [kg, setKG] = React.useState(0);
    const [piezas, setPiezas] = React.useState(0);
    const [material, setMaterial] = React.useState('');
    const [calibre, setCalibre] = React.useState('');
    const [linea, setLinea] = React.useState('');
    const [color, setColor] = React.useState('');
    const [fechaSecado, setFechaSecado] = React.useState('');
    const [korona, setKorona] = React.useState('');
    const [engraseSeco, setEngraseSeco] = React.useState('');
    const [escurrir, setEscurrir] = React.useState('');
    const [desvenado, setDesvenado] = React.useState('');
    const [bauce, setBauce] = React.useState('');
    const [vacio, setVacio] = React.useState('');
    const [taic, setTaic] = React.useState('');
    const [aereo, setAereo] = React.useState('');
    const [toggling, setToggling] = React.useState('');
    const [ablandado, setAblandado] = React.useState('');
    const [pulido, setPulido] = React.useState('');
    const [abatanado, setAbatanado] = React.useState('');
    const [vacio2, setVacio2] = React.useState('');
    const [pistolas, setPistolas] = React.useState('');
    const [roller, setRoller] = React.useState('');
    const [finilux, setFinilux] = React.useState('');
    const [rotoprex, setRotoprex] = React.useState('');
    const [partido, setPartido] = React.useState('');
    const [grabado, setGrabado] = React.useState('');
    const [envioPlanta, setEnvioPlanta] = React.useState('');
    const [fechaFactura, setFechaFactura] = React.useState('');
    const [numeroFactura, setNumeroFactura] = React.useState('');

    useEffect((rows) => {
        EngrasesService.getEngrases().then(response => {
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

    const handleFechaEngraseChange = (event) => {
        setFechaEngrase(event.target.value);
    };

    const handleNCargaChange = (event) => {
        setNCarga(event.target.value);
    };

    const handleCueroChange = (event) => {
        setCuero(event.target.value);
    };

    const handleCamionPartidaChange = (event) => {
        setCamionPartida(event.target.value);
    };

    const handleKGChange = (event) => {
        setKG(event.target.value);
    };

    const handlePiezasChange = (event) => {
        setPiezas(event.target.value);
    };

    const handleMaterialChange = (event) => {
        setMaterial(event.target.value);
    };

    const handleCalibreChange = (event) => {
        setCalibre(event.target.value);
    };

    const handleLineaChange = (event) => {
        setLinea(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleFechaSecadoChange = (event) => {
        setFechaSecado(event.target.value);
    };

    const handleKoronaChange = (event) => {
        setKorona(event.target.value);
    };

    const handleEngraseSecoChange = (event) => {
        setEngraseSeco(event.target.value);
    };

    const handleEscurrirChange = (event) => {
        setEscurrir(event.target.value);
    };

    const handleDesvenadoChange = (event) => {
        setDesvenado(event.target.value);
    };

    const handleBauceChange = (event) => {
        setBauce(event.target.value);
    };

    const handleVacioChange = (event) => {
        setVacio(event.target.value);
    };

    const handleTaicChange = (event) => {
        setTaic(event.target.value);
    };

    const handleAereoChange = (event) => {
        setAereo(event.target.value);
    };

    const handleTogglingChange = (event) => {
        setToggling(event.target.value);
    };

    const handleAblandadoChange = (event) => {
        setAblandado(event.target.value);
    };

    const handlePulidoChange = (event) => {
        setPulido(event.target.value);
    };

    const handleAbatanadoChange = (event) => {
        setAbatanado(event.target.value);
    };

    const handleVacio2Change = (event) => {
        setVacio2(event.target.value);
    };

    const handlePistolasChange = (event) => {
        setPistolas(event.target.value);
    };

    const handleRollerChange = (event) => {
        setRoller(event.target.value);
    };

    const handleFiniluxChange = (event) => {
        setFinilux(event.target.value);
    };

    const handleRotoprexChange = (event) => {
        setRotoprex(event.target.value);
    };

    const handlePartidoChange = (event) => {
        setPartido(event.target.value);
    };

    const handleGrabadoChange = (event) => {
        setGrabado(event.target.value);
    };

    const handleEnvioPlantaChange = (event) => {
        setEnvioPlanta(event.target.value);
    };

    const handleFechaFacturaChange = (event) => {
        setFechaFactura(event.target.value);
    };

    const handleNumeroFacturaChange = (event) => {
        setNumeroFactura(event.target.value);
    };

    function updateEngrase(params, event) {
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
        EngrasesService.engraseUpdate(data).then(response => {
            if (response.status === 200) {
                console.log(response);
                console.log('simon')
            } else {
                console.log('nel')
            }
        })
    }

    function newEngrase() {
        let data = {
            fechaEngrase: fechaEngrase,
            nCarga: nCarga,
            cuero: cuero,
            camionPartida: camionPartida,
            kg: kg,
            piezas: piezas,
            material: material,
            calibre: calibre,
            linea: linea,
            color: color,
            fechaSecado: fechaSecado,
            korona: korona,
            engraseSeco: engraseSeco,
            ecurrir: escurrir,
            desvenado: desvenado,
            bauce: bauce,
            vacio: vacio,
            taic: taic,
            aereo: aereo,
            toggling: toggling,
            ablandado: ablandado,
            pulido: pulido,
            abatanado: abatanado,
            vacio2: vacio2,
            pistolas: pistolas,
            roller: roller,
            finilux: finilux,
            rotoprex: rotoprex,
            partido: partido,
            grabado: grabado,
            envioPlanta: envioPlanta,
            fechaFactura: fechaFactura,
            numeroFactura: numeroFactura
        }
        EngrasesService.newEngrase(data).then(response => {
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
            field: 'id',
            width: 150,
            headerName: 'Id',
        },
        {
            field: 'fechaEngrase',
            width: 150,
            headerName: 'Fecha Engrase',
        },
        {
            field: 'nCarga',
            width: 150,
            headerName: 'Numero Carga',
        },
        {
            field: 'cuero',
            width: 150,
            headerName: 'Cuero',
        },
        {
            field: 'camionPartida',
            width: 150,
            headerName: 'Camion/Partida',
        },
        {
            field: 'kg',
            width: 150,
            headerName: 'KG',
        },
        {
            field: 'piezas',
            width: 150,
            headerName: 'Piezas',
        },
        {
            field: 'material',
            width: 150,
            headerName: 'Material',
        },
        {
            field: 'calibre',
            width: 150,
            headerName: 'Calibre',
        },
        {
            field: 'linea',
            width: 150,
            headerName: 'Linea',
        },
        {
            field: 'color',
            width: 150,
            headerName: 'Color',
        },
        {
            field: 'fechaSecado',
            width: 150,
            headerName: 'Fecha Secado',
        },
        {
            field: 'korona',
            width: 150,
            headerName: 'Korona',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'engraseSeco',
            width: 150,
            headerName: 'Engrase Seco',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'escurrir',
            width: 150,
            headerName: 'Escurrir',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'desvenado',
            width: 150,
            headerName: 'Desvenado',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'bauce',
            width: 150,
            headerName: 'Bauce',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'vacio',
            width: 150,
            headerName: 'Vacio',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'taic',
            width: 150,
            headerName: 'Taic',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'aereo',
            width: 150,
            headerName: 'Aereo',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'toggling',
            width: 150,
            headerName: 'Toggling',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'ablandado',
            width: 150,
            headerName: 'Ablandado',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'pulido',
            width: 150,
            headerName: 'Pulido',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'abatanado',
            width: 150,
            headerName: 'Abatanado',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'vacio2',
            width: 150,
            headerName: 'Vacio',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'pistolas',
            width: 150,
            headerName: 'Pistolas',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'roller',
            width: 150,
            headerName: 'Roller',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'finilux',
            width: 150,
            headerName: 'Finilux',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'rotoprex',
            width: 150,
            headerName: 'Rotoprex',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'partido',
            width: 150,
            headerName: 'Partido',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'grabado',
            width: 150,
            headerName: 'Grabado',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'envioPlanta',
            width: 150,
            headerName: 'Envio Planta',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'fechaFactura',
            width: 150,
            headerName: 'Fecha Factura',
            valueGetter: handleNullValue,
            editable: true
        },
        {
            field: 'numeroFactura',
            width: 150,
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
                        updateEngrase(params, event)
                    }} />
            </Box>
            <Button variant="contained" onClick={handleOpenNew}>Nuevo Engrase</Button>
            <Dialog open={openNew} onClose={handleCloseNew} >
                <DialogTitle>Nuevo engrase</DialogTitle>
                <DialogContent >
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introducir informacion de engrase
                    </DialogContentText>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <List >
                            <ListItem>
                                <TextField autoFocus margin="dense" id="fechaEngrase" label="Fecha Engrase" type="text" variant="standard" onChange={handleFechaEngraseChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="NCarga" label="Numero Carga" type="text" variant="standard" onChange={handleNCargaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Cuero" label="Cuero" type="text" variant="standard" onChange={handleCueroChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="CamionPartida" label="Camion/Partida" type="text" variant="standard" onChange={handleCamionPartidaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="KG" label="KG" type="number" variant="standard" onChange={handleKGChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Piezas" label="Piezas" type="number" variant="standard" onChange={handlePiezasChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Material" label="Material" type="text" variant="standard" onChange={handleMaterialChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Calibre" label="Calibre" type="text" variant="standard" onChange={handleCalibreChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Linea" label="Linea" type="text" variant="standard" onChange={handleLineaChange} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Color" label="Color" type="text" variant="standard" onChange={handleColorChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="fechaSecado" label="Fecha Secado" type="text" variant="standard" onChange={handleFechaSecadoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Korona" label="Korona" type="text" variant="standard" onChange={handleKoronaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="EngraseSeco" label="Engrase Seco" type="text" variant="standard" onChange={handleEngraseSecoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Escurrir" label="Escurrir" type="text" variant="standard" onChange={handleEscurrirChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Desvenado" label="Desvenado" type="text" variant="standard" onChange={handleDesvenadoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Bauce" label="Bauce" type="text" variant="standard" onChange={handleBauceChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Vacio" label="Vacio" type="text" variant="standard" onChange={handleVacioChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Taic" label="Taic" type="text" variant="standard" onChange={handleTaicChange} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Aereo" label="Aereo" type="text" variant="standard" onChange={handleAereoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Toggling" label="Toggling" type="text" variant="standard" onChange={handleTogglingChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Ablandado" label="Ablandado" type="text" variant="standard" onChange={handleAblandadoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Pulido" label="Pulido" type="text" variant="standard" onChange={handlePulidoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Abatanado" label="Abatanado" type="text" variant="standard" onChange={handleAbatanadoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Vacio2" label="Vacio2" type="text" variant="standard" onChange={handleVacio2Change} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Pistolas" label="Pistolas" type="text" variant="standard" onChange={handlePistolasChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Roller" label="Roller" type="text" variant="standard" onChange={handleRollerChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Finilux" label="Finilux" type="text" variant="standard" onChange={handleFiniluxChange} />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Rotoprex" label="Rotoprex" type="text" variant="standard" onChange={handleRotoprexChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Partido" label="Partido" type="text" variant="standard" onChange={handlePartidoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="Grabado" label="Grabado" type="text" variant="standard" onChange={handleGrabadoChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="EnvioPlanta" label="Envio Planta" type="text" variant="standard" onChange={handleEnvioPlantaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="FechaFactura" label="Fecha Factura" type="text" variant="standard" onChange={handleFechaFacturaChange} />
                            </ListItem>
                            <ListItem>
                                <TextField autoFocus margin="dense" id="NumeroFactura" label="Numero Factura" type="text" variant="standard" onChange={handleNumeroFacturaChange} />
                            </ListItem>
                        </List>
                    </div>
                    {/* {error ? <Alert severity='error'>Something went wrong</Alert> : <></>} */}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={newEngrase}>Accept</Button>
                    <Button variant="contained" onClick={handleCloseNew}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
