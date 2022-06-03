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
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

import FormulasService from '../services/FormulasService';
import UserServices from '../services/UsuariosService';
import InOutService from '../services/InOutService';
import StockService from '../services/StockService';

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

export default function Formulas() {
    const [article, setArticle] = React.useState('');
    const [color, setColor] = React.useState('');
    const [weight, setWeight] = React.useState(0);
    const [thickness, setThickness] = React.useState('');
    const [material, setMaterial] = React.useState('');
    const [details, setDetails] = React.useState('');
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [axiosError, setAxiosError] = React.useState(false);
    const [stockError, setStockError] = React.useState(false);
    const [requiredError, setRequiredError] = React.useState(false);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    React.useEffect(() => {
        return;
    }, [stockError])


    let userData = {
        uName: user,
        pass: password
    };

    function userAuth(userData) {
        UserServices.login(userData).then(response => {
            if (response.status === 200) {
                setError(false);
                checkStock();
                if (stockError === true) {
                    return;
                } else {
                    let formulaData = {
                        formulaId: rows[0].formulaId,
                        userId: response.data.id,
                        date: new Date().toLocaleString(),
                        weight: weight,
                        thickness: thickness,
                        material: material,
                        details: details
                    };
                    postFormula(formulaData);
                }
                console.log(response.data);
            }

        }).catch(function (error) {
            if (error.response) {
                setSuccess(false);
                setError(true);
                console.log(error.response.data)
            }
        })
    }

    function checkStock() {
        let ingredientsTotal = {};
        rows.map((row) => {
            if (row.prodId === 1 || row.prodId === 2 || row.prodId === 99) {
                return
            } else if (ingredientsTotal[row.prodId]) {
                ingredientsTotal[row.prodId] = ingredientsTotal[row.prodId] + ((weight) * (row.percentage)) / 100;
            } else {
                ingredientsTotal[row.prodId] = ((weight) * (row.percentage)) / 100;
            }
        })
        // console.log(ingredientsTotal);
        StockService.getStock().then(response => {
            let stock = response.data;
            let ingredientIds = Object.keys(ingredientsTotal);
            for (let i = 0; i < ingredientIds.length; i++) {
                ingredientIds[i] = parseInt(ingredientIds[i])
            }
            // console.log(stock);
            // console.log(ingredientIds);
            let stockValues = {}
            stock.map(prod => {
                if (ingredientIds.includes(prod.id)) {
                    stockValues[prod.id] = prod.qty
                } else {
                    return;
                }
            })
            // console.log(stockValues);
            let formulaTotal = Object.values(ingredientsTotal);
            let filteredStockTotal = Object.values(stockValues);
            console.log(formulaTotal);
            console.log(filteredStockTotal);

            let stockAuth = filteredStockTotal.every(function (element, index) {
                return element > formulaTotal[index];
            })
            console.log(stockAuth);

            if (stockAuth) {
                setStockError(false);
                ingredientIds.map(i => {
                    let stockData = {
                        id: i,
                        qty: Math.round(ingredientsTotal[i])
                    }
                    // console.log(stockData);
                    StockService.updateStock(stockData).then(response => {
                        // console.log(response.data);
                    }).catch(function (error) {
                        if (error.response) {
                            setStockError(true);
                            setSuccess(false);
                            console.log(error.response.data)
                        }
                    })
                    let inOutData = {
                        date: new Date().toLocaleString(),
                        prodId: i,
                        qty: stockData.qty,
                        InOrOut: 'Out'
                    }
                    // console.log(inOutData);
                    InOutService.postInOut(inOutData).then(response => {
                        if (response.data === 200) {
                            // console.log(response.data)
                        }
                    }).catch(function (error) {
                        if (error.response) {
                            console.log(error.response.data)
                        }
                    })
                    // console.log(response.data)

                })
            } else {
                setStockError(true);
            }
        })



    }

    function postFormula(data) {
        FormulasService.postLog(data).then(response => {
            if (response.status === 200) {
                setSuccess(true);
                setError(false);
                console.log(response.data);
            } else {
                console.log(response.data);
            }
        })
    }

    function getFormula(f_name) {
        FormulasService.getFormula(f_name).then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                setAxiosError(false);
                setStockError(false);
                setError(false);
                setSuccess(false);
            }
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data)
                setRows([]);
                setAxiosError(true);
            }
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
        setUser('');
        setPassword('');
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleUserChange = (event) => {
        setUser(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleArticleChange = (event) => {
        setArticle(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value);
    };

    const handleThicknessChange = (event) => {
        setThickness(event.target.value);
    };

    const handleMaterialChange = (event) => {
        setMaterial(event.target.value);
    };

    const handleDetailsChange = (event) => {
        setDetails(event.target.value);
    };

    return (
        <>
            <div className="formula-input" style={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List>
                    <ListItem disablePadding>
                        <FormControl required style={{ width: '58.5%', marginTop: '4px', marginBottom: '4px' }}>
                            <InputLabel id="demo-simple-select-label">Article</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={article}
                                label="Article"
                                onChange={handleArticleChange}
                            >
                                <MenuItem value={'Bulldog'}>Bulldog</MenuItem>
                                <MenuItem value={'UtopiaSmooth'}>UtopiaSmooth</MenuItem>
                                <MenuItem value={'Diva'}>Diva</MenuItem>
                                <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
                                <MenuItem value={'Shrunken'}>Shrunken</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem disablePadding>
                        <FormControl required style={{ width: '58.5%', marginTop: '4px', marginBottom: '4px' }}>
                            <InputLabel id="demo-simple-select-label">Color</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={color}
                                label="Color"
                                onChange={handleColorChange}
                            >
                                <MenuItem value={'Brown'}>Brown</MenuItem>
                                <MenuItem value={'Natural'}>Natural</MenuItem>
                                <MenuItem value={'Black'}>Black</MenuItem>
                                <MenuItem value={'DarkBrown'}>DarkBrown</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem disablePadding>
                        <TextField required id="outlined-basic" label="Weight" onChange={handleWeightChange} variant="outlined" margin='dense' />
                    </ListItem>
                    <ListItem disablePadding>
                        <TextField required id="outlined-basic" label="Thickness" onChange={handleThicknessChange} variant="outlined" margin='dense' />
                    </ListItem>
                    <ListItem disablePadding>
                        <TextField required id="outlined-basic" label="Material" onChange={handleMaterialChange} variant="outlined" margin='dense' />
                    </ListItem>
                    <ListItem disablePadding>
                        <TextField id="outlined-basic" label="Details" multiline onChange={handleDetailsChange} variant="outlined" margin='dense' />
                    </ListItem>
                </List>
            </div>
            <div>
                {error ? <Alert severity='error'>Incorrect user or password</Alert> : <></>}
                {axiosError ? <Alert severity='error'>No registered formula for that 'Article Color' pair</Alert> : <></>}
                {stockError ? <Alert severity='error'>There is not enough chemicals stock to run this formula</Alert> : <></>}
                {requiredError ? <Alert severity='error'>Please fill all the required input fields</Alert> : <></>}
                {success ? <Alert severity='success'>Formula info successfully stored in database</Alert> : <></>}
                <Button variant="text" onClick={() => {
                    getFormula(article + '_' + color)
                }}>Buscar</Button>
                <Button variant='text' onClick={() => {
                    if (weight === 0 || thickness === '' || material === '' || article === '' || color === '') {
                        setRequiredError(true);
                    } else {
                        setRequiredError(false);
                        handleClickOpen();
                    }

                }} >Aceptar</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Authorization needed</DialogTitle>
                    <DialogContent>
                        {/* {() => handleAlert(success, error)} */}
                        <DialogContentText>
                            Introduce User and Password for authorization
                        </DialogContentText>
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="user"
                                label="User"
                                type="email"
                                variant="standard"
                                onChange={handleUserChange}
                            />
                        </div>
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="password"
                                label="Password"
                                type="pasword"
                                variant="standard"
                                onChange={handlePasswordChange}
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => {

                            userAuth(userData);
                            handleClose()

                        }}>Accept</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Percentage %</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Temp (C°)</TableCell>
                            <TableCell>Time (min)</TableCell>
                            <TableCell>pH</TableCell>
                            <TableCell>#Cut</TableCell>
                            <TableCell>Observations</TableCell>
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
                                    <TableCell>{row.percentage}</TableCell>
                                    {(row.prodId === 2) ? <TableCell></TableCell> : (row.prodId !== 99) ? <TableCell>{((weight) * (row.percentage)) / 100}</TableCell> : <TableCell></TableCell>}
                                    <TableCell>{row.pName}</TableCell>
                                    <TableCell>{row.temp}</TableCell>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>{row.ph}</TableCell>
                                    <TableCell>{row.cut}</TableCell>
                                    <TableCell sx={{ minWidth: 650 }}>{rows[rows.length - 1].observations}</TableCell>

                                </TableRow>
                            ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
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
        </>
    )
}
