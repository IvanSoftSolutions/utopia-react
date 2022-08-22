import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableRow from '@mui/material/TableRow';
import { visuallyHidden } from '@mui/utils';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import EngrasesService from '../services/EngrasesService';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'editBtn',
        numeric: false,
        disablePadding: false,
        label: 'Action',
    },
    {
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'Id',
    },
    {
        id: 'fechaEngrase',
        numeric: false,
        disablePadding: false,
        label: 'Fecha Engrase',
    },
    {
        id: 'nCarga',
        numeric: false,
        disablePadding: false,
        label: 'Numero Carga',
    },
    {
        id: 'cuero',
        numeric: false,
        disablePadding: false,
        label: 'Cuero',
    },
    {
        id: 'camionPartida',
        numeric: false,
        disablePadding: false,
        label: 'Camion/Partida',
    },
    {
        id: 'kg',
        numeric: true,
        disablePadding: false,
        label: 'KG',
    },
    {
        id: 'piezas',
        numeric: true,
        disablePadding: false,
        label: 'Piezas',
    },
    {
        id: 'material',
        numeric: false,
        disablePadding: false,
        label: 'Material',
    },
    {
        id: 'calibre',
        numeric: false,
        disablePadding: false,
        label: 'Calibre',
    },
    {
        id: 'linea',
        numeric: false,
        disablePadding: false,
        label: 'Linea',
    },
    {
        id: 'color',
        numeric: false,
        disablePadding: false,
        label: 'Color',
    },
    {
        id: 'fechaSecado',
        numeric: false,
        disablePadding: false,
        label: 'Fecha Secado',
    },
    {
        id: 'Korona',
        numeric: false,
        disablePadding: false,
        label: 'Korona',
    },
    {
        id: 'EngraseSeco',
        numeric: false,
        disablePadding: false,
        label: 'Engrase Seco',
    },
    {
        id: 'Escurrir',
        numeric: false,
        disablePadding: false,
        label: 'Escurrir',
    },
    {
        id: 'Desvenado',
        numeric: false,
        disablePadding: false,
        label: 'Desvenado',
    },
    {
        id: 'Bauce',
        numeric: false,
        disablePadding: false,
        label: 'Bauce',
    },
    {
        id: 'Vacio',
        numeric: false,
        disablePadding: false,
        label: 'Vacio',
    },
    {
        id: 'Taic',
        numeric: false,
        disablePadding: false,
        label: 'Taic',
    },
    {
        id: 'Aereo',
        numeric: false,
        disablePadding: false,
        label: 'Aereo',
    },
    {
        id: 'Toggling',
        numeric: false,
        disablePadding: false,
        label: 'Toggling',
    },
    {
        id: 'Ablandado',
        numeric: false,
        disablePadding: false,
        label: 'Ablandado',
    },
    {
        id: 'Pulido',
        numeric: false,
        disablePadding: false,
        label: 'Pulido',
    },
    {
        id: 'Abatanado',
        numeric: false,
        disablePadding: false,
        label: 'Abatanado',
    },
    {
        id: 'Vacio2',
        numeric: false,
        disablePadding: false,
        label: 'Vacio',
    },
    {
        id: 'Pistolas',
        numeric: false,
        disablePadding: false,
        label: 'Pistolas',
    },
    {
        id: 'Roller',
        numeric: false,
        disablePadding: false,
        label: 'Roller',
    },
    {
        id: 'Finilux',
        numeric: false,
        disablePadding: false,
        label: 'Finilux',
    },
    {
        id: 'Rotoprex',
        numeric: false,
        disablePadding: false,
        label: 'Rotoprex',
    },
    {
        id: 'Partido',
        numeric: false,
        disablePadding: false,
        label: 'Partido',
    },
    {
        id: 'Grabado',
        numeric: false,
        disablePadding: false,
        label: 'Grabado',
    },
    {
        id: 'EnvioPlanta',
        numeric: false,
        disablePadding: false,
        label: 'Envio Planta',
    },
    {
        id: 'FechaFactura',
        numeric: false,
        disablePadding: false,
        label: 'Fecha Factura',
    },
    {
        id: 'NumeroFactura',
        numeric: false,
        disablePadding: false,
        label: 'Numero Factura',
    }
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function Engrases() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [openNew, setOpenNew] = React.useState(false);
    const [column, setColumn] = React.useState('');
    const [columnValue, setColumnValue] = React.useState('');
    const [engraseId, setEngraseId] = React.useState(0);

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


    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const engrasesColumns = headCells.slice(13);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect((rows) => {
        EngrasesService.getEngrases().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                console.log(rows);
            }
        });
    }, [])

    const handleClickOpen = (id) => {
        setOpen(true);
        setEngraseId(id);
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

    const handleColumnChange = (event) => {
        setColumn(event.target.value);
    };

    const handleColumnValueChange = (event) => {
        setColumnValue(event.target.value);
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

    function updateEngrase() {
        let data = {
            id: engraseId,
            column: column,
            value: columnValue
        }
        EngrasesService.engraseUpdate(data).then(response => {
            if (response.status === 200) {
                console.log(response);
                console.log('simon')
                setOpen(false);
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

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <Button variant="contained" onClick={() => handleClickOpen(row.id)}>Edit</Button>
                                    <TableCell component="th" scope="row">{row.id}</TableCell>
                                    <TableCell>{row.fechaEngrase}</TableCell>
                                    <TableCell>{row.nCarga}</TableCell>
                                    <TableCell>{row.cuero}</TableCell>
                                    <TableCell>{row.camionPartida}</TableCell>
                                    <TableCell>{row.kg}</TableCell>
                                    <TableCell>{row.piezas}</TableCell>
                                    <TableCell>{row.material}</TableCell>
                                    <TableCell>{row.calibre}</TableCell>
                                    <TableCell>{row.linea}</TableCell>
                                    <TableCell>{row.color}</TableCell>
                                    <TableCell>{row.fechaSecado}</TableCell>
                                    <TableCell>{row.korona}</TableCell>
                                    <TableCell>{row.engraseSeco}</TableCell>
                                    <TableCell>{row.escurrir}</TableCell>
                                    <TableCell>{row.desvenado}</TableCell>
                                    <TableCell>{row.bauce}</TableCell>
                                    <TableCell>{row.vacio}</TableCell>
                                    <TableCell>{row.taic}</TableCell>
                                    <TableCell>{row.aereo}</TableCell>
                                    <TableCell>{row.toggling}</TableCell>
                                    <TableCell>{row.ablandado}</TableCell>
                                    <TableCell>{row.pulido}</TableCell>
                                    <TableCell>{row.abatanado}</TableCell>
                                    <TableCell>{row.vacio2}</TableCell>
                                    <TableCell>{row.pistolas}</TableCell>
                                    <TableCell>{row.roller}</TableCell>
                                    <TableCell>{row.finilux}</TableCell>
                                    <TableCell>{row.rotoprex}</TableCell>
                                    <TableCell>{row.partido}</TableCell>
                                    <TableCell>{row.grabado}</TableCell>
                                    <TableCell>{row.envioPlanta}</TableCell>
                                    <TableCell>{row.fechaFactura}</TableCell>
                                    <TableCell>{row.numeroFactura}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={8}
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={handleOpenNew}>Nuevo Engrase</Button>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>Editar informacion de engrase</DialogTitle>
                <DialogContent >
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Elige la columna que quieres editar
                    </DialogContentText>
                    <List>
                        <ListItem>
                            <FormControl required margin='dense' sx={{ width: '100%' }}>
                                <InputLabel id="demo-simple-select-label">Name</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={column}
                                    label="Column"
                                    onChange={handleColumnChange}
                                >
                                    {engrasesColumns.map((column) => (
                                        <MenuItem value={column.id}>{column.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </ListItem>
                        <ListItem>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="columnValue"
                                label="Valor"
                                type="text"
                                variant="standard"
                                onChange={handleColumnValueChange}
                            />
                        </ListItem>
                    </List>
                    {/* {error ? <Alert severity='error'>Something went wrong</Alert> : <></>} */}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={updateEngrase}>Accept</Button>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
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
