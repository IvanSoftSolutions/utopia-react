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
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
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
import { useState, useEffect } from 'react';

import HidesInvService from '../services/HidesInvService';

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

export default function HidesInv() {
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Article</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Kind</TableCell>
                            <TableCell>Wholes Hide</TableCell>
                            <TableCell>Sides</TableCell>
                            <TableCell>Shrunken Shoulder</TableCell>
                            <TableCell>Double Butt</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>Ubicacion</TableCell>
                            <TableCell>Pallet</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Cost Per Hide</TableCell>
                            <TableCell>Pieces x Cost</TableCell>
                            <TableCell>Fungus</TableCell>
                            <TableCell>Shaved</TableCell>
                            <TableCell>Thickness</TableCell>
                            <TableCell>Rejects</TableCell>
                            <TableCell>Is It Really The Pallet At Warehouse A/B?</TableCell>
                            <TableCell>UPO/Truck</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Reviewer</TableCell>
                            <TableCell>Observations</TableCell>
                            <TableCell>Modification/Sales</TableCell>
                            <TableCell>Reviewed</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows).map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.article}</TableCell>
                                    <TableCell>{row.color}</TableCell>
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell>{row.kind}</TableCell>
                                    <TableCell>{row.wholesHide}</TableCell>
                                    <TableCell>{row.sides}</TableCell>
                                    <TableCell>{row.shrunkenShoulder}</TableCell>
                                    <TableCell>{row.doubleButt}</TableCell>
                                    <TableCell>{row.total}</TableCell>
                                    <TableCell>{row.grade}</TableCell>
                                    <TableCell>{row.ubicacion}</TableCell>
                                    <TableCell>{row.pallet}</TableCell>
                                    <TableCell>{row.location}</TableCell>
                                    <TableCell>{row.costHide}</TableCell>
                                    <TableCell>{row.piecesxcost}</TableCell>
                                    <TableCell>{row.fungus}</TableCell>
                                    <TableCell>{row.shaved}</TableCell>
                                    <TableCell>{row.thickness}</TableCell>
                                    <TableCell>{row.rejects}</TableCell>
                                    <TableCell>{row.isPallet}</TableCell>
                                    <TableCell>{row.upoTruck}</TableCell>
                                    <TableCell>{row.date}</TableCell>
                                    <TableCell>{row.reviewer}</TableCell>
                                    <TableCell>{row.observations}</TableCell>
                                    <TableCell>{row.modificationSales}</TableCell>
                                    <TableCell>{row.reviewed}</TableCell>
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
            <div>
                <Button variant='contained' onClick={handleClickOpen}>Agregar</Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add chemical</DialogTitle>
                <DialogContent>
                    {/* {() => handleAlert(success, error)} */}
                    <DialogContentText>
                        Introduce new pallet info
                    </DialogContentText>
                    <List>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="article" label="Article" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="color" label="Color" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="type" label="Type" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="kind" label="Kind" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="wholesHide" label="Wholes Hide" type="number" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="sides" label="Sides" type="number" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="shrunkenShoulder" label="Shrunken Shoulder" type="number" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="doubleButt" label="Double Butt" type="number" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="total" label="Total" type="number" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="grade" label="Grade" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="ubicacion" label="Ubicacion" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="pallet" label="Pallet" type="number" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="location" label="Location" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="costHide" label="Cost per hide" type="number" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="piecesCost" label="Pieces x Cost" type="number" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="fungus" label="Fungus" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="shaved" label="Shaved" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="thickness" label="Thickness" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="rejects" label="Rejects" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="isPallet" label="Is ir really the pallet at Warehouse A/B?" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="upoTruck" label="UPO/Truck" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="date" label="Date" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="reviewer" label="Reviewer" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="observations" label="Observations" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="modificationSales" id="Modification/Sales" label="Location" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                        <ListItem>
                            <TextField autoFocus margin="dense" id="reviewed" label="Reviewed" type="text" variant="standard" /*onChange={handleUserChange}*/ />
                        </ListItem>
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button>Accept</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
