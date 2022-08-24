import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import FormulasService from '../services/FormulasService';
import UserServices from '../services/UsuariosService';
import InOutService from '../services/InOutService';
import StockService from '../services/StockService';
import ArticleService from '../services/ArticleService';
import ColorService from '../services/ColorService';
import HidesInvService from '../services/HidesInvService';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default function Formulas() {
    const [article, setArticle] = React.useState('');
    const [color, setColor] = React.useState('');
    const [weight, setWeight] = React.useState(0);
    const [thickness, setThickness] = React.useState('');
    const [material, setMaterial] = React.useState('Material');
    const [details, setDetails] = React.useState('');
    const [pallet, setPallet] = React.useState(0);
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const [articleRows, setArticleRows] = React.useState([]);
    const [colorRows, setColorRows] = React.useState([]);
    const [palletRows, setPalletRows] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [axiosError, setAxiosError] = React.useState(false);
    const [stockError, setStockError] = React.useState(false);
    const [regex, setRegex] = React.useState(false);
    const [requiredError, setRequiredError] = React.useState(false);
    const [stockAuth, setStockAuth] = React.useState(false);
    const re = /^\d\.\d-\d\.\d$/

    React.useEffect((articleRows, colorRows, palletRows) => {
        ArticleService.getArticles().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setArticleRows(response.data);
                console.log(articleRows);
            }
        });
        ColorService.getColors().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setColorRows(response.data);
                console.log(colorRows);
            }
        });
        HidesInvService.getPalletId().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setPalletRows(response.data);
                console.log(palletRows);
            }
        })
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
                if (stockAuth === false) {
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
                    deletePallet();
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

            let stockAux = filteredStockTotal.every(function (element, index) {
                return element > formulaTotal[index];
            })
            setStockAuth(stockAux)
            console.log(stockAux);

            if (stockAux) {
                setStockError(false);
                ingredientIds.map(i => {
                    let stockData = {
                        id: i,
                        qty: ingredientsTotal[i]
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

    function deletePallet() {
        HidesInvService.deletePallet(pallet).then(response => {
            if (response.status === 200) {
                console.log(response.data)
            } else {
                console.log('nel')
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

    const handleDetailsChange = (event) => {
        setDetails(event.target.value);
    };

    const handlePalletChange = (event) => {
        setPallet(event.target.value);
        setMaterial(event.target.value.kind);
    }

    function getQty(params) {
        if (params.row.pName === 'DRENAR' || params.row.pName === 'OBSERVATIONS') {
            return ('');
        } else {
            return (params.row.percentage * weight / 100)
        }
    }

    function getProduct(params) {
        if (params.row.pName === 'OBSERVATIONS') {
            return ('');
        } else {
            return (params.row.pName)
        }
    }

    function handleLastRow(params) {
        if (params.row.pName === 'OBSERVATIONS') {
            return (params.row.observations);
        } else {
            return (params.row.percentage);
        }
    }

    function handleObservations(params) {
        if (params.row.prodId === 999) {
            return ('');
        } else {
            return (params.row.observations);
        }
    }

    const headCells = [
        {
            field: 'percentage',
            width: 110,
            headerName: 'Percentage %',
            valueGetter: handleLastRow,
            sortable: false,
            filterable: false,
            // align: 'right',
            colSpan: ({ row }) => {
                if (row.prodId === 999) {
                    return 6;
                } else {
                    return undefined;
                }
            }
        },
        {
            field: 'quantity',
            width: 100,
            headerName: 'Quantity',
            valueGetter: getQty,
            sortable: false,
            filterable: false,
        },
        {
            field: 'pName',
            width: 250,
            headerName: 'Product',
            valueGetter: getProduct,
            sortable: false,
            filterable: false,
        },
        {
            field: 'temp',
            width: 100,
            headerName: 'Temp (C°)',
            sortable: false,
            filterable: false,
        },
        {
            field: 'time',
            width: 100,
            headerName: 'Time (min)',
            sortable: false,
            filterable: false,
        },
        {
            field: 'ph',
            width: 100,
            headerName: 'pH',
            sortable: false,
            filterable: false,
        },
        {
            field: 'cut',
            width: 100,
            headerName: '#Cut',
            sortable: false,
            filterable: false,
        },
        {
            field: 'observations',
            width: 800,
            headerName: 'Observations',
            valueGetter: handleObservations,
            sortable: false,
            filterable: false,
        }
    ]

    return (
        <>
            {/* Input fields container */}
            <div className="formula-input" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: 650, bgcolor: 'background.paper' }}>
                <List >
                    {/* Article */}
                    <ListItem disablePadding>
                        <FormControl required margin='dense' sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-label">Article</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={article}
                                label="Article"
                                onChange={handleArticleChange}
                            >
                                {articleRows.map((article) => (
                                    <MenuItem value={article.name}>{article.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    {/* Color */}
                    <ListItem disablePadding>
                        <FormControl required margin='dense' sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-label">Color</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={color}
                                label="Color"
                                onChange={handleColorChange}
                            >
                                {colorRows.map((color) => (
                                    <MenuItem value={color.name}>{color.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    {/* Pallet */}
                    <ListItem disablePadding>
                        <FormControl required margin='dense' sx={{ width: '100%' }}>
                            <InputLabel id="demo-simple-select-label">Pallet</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={pallet}
                                label="Pallet"
                                onChange={handlePalletChange}
                            >
                                {palletRows.map((pallet) => (
                                    <MenuItem value={pallet}>{pallet.id} {pallet.article} {pallet.upoTruck}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItem>
                    {/* Weight */}
                    <ListItem disablePadding>
                        <TextField required id="outlined-basic" label="Weight" onChange={handleWeightChange} variant="outlined" margin='dense' />
                    </ListItem>
                </List>
                <List margin='dense' >
                    {/* Thickness */}
                    <ListItem disablePadding>
                        <TextField required id="outlined-basic" label="Thickness" onChange={handleThicknessChange} variant="outlined" margin='dense' />
                    </ListItem>
                    {/* Material */}
                    <ListItem disablePadding>
                        <TextField disabled id="outlined-basic" placeholder={material} value={material} variant="outlined" margin='dense' />
                    </ListItem>
                    {/* Details */}
                    <ListItem disablePadding>
                        <TextField id="outlined-basic" label="Details" multiline onChange={handleDetailsChange} variant="outlined" margin='dense' fullWidth />
                    </ListItem>
                </List>
            </div>
            {/* Search/Accept buttons, Auth Dialog container & table container */}
            <div>
                {/* Search buttons */}
                <div style={{ display: 'flex', gap: 26, marginBottom: 15 }}>
                    <Button variant='contained' onClick={() => {
                        getFormula(article + '_' + color);
                    }}>Buscar</Button>
                    <Button variant='contained' onClick={() => {
                        if (weight === 0 || thickness === '' || material === '' || article === '' || color === '' || pallet === 0) {
                            setRequiredError(true);
                        } else if (re.test(thickness)) {
                            setRequiredError(false);
                            setRegex(false);
                            handleClickOpen();
                        } else {
                            setRegex(true);
                        }

                    }} >Aceptar</Button>
                </div>
                {/* Error/Success notificacions */}
                {error ? <Alert severity='error'>Incorrect user or password</Alert> : <></>}
                {axiosError ? <Alert severity='error'>No registered formula for that 'Article Color' pair</Alert> : <></>}
                {stockError ? <Alert severity='error'>There is not enough chemicals stock to run this formula</Alert> : <></>}
                {requiredError ? <Alert severity='error'>Please fill all the required input fields</Alert> : <></>}
                {regex ? <Alert severity='error'>Apartado "Thickness" no tiene el formato correcto</Alert> : <></>}
                {success ? <Alert severity='success'>Formula info successfully stored in database</Alert> : <></>}
                {/* Auth Dialog Container */}
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
                                type="password"
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
            {/* Table container */}
            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={headCells}
                    components={{ Toolbar: GridToolbar }}
                    disableColumnFilter
                    disableColumnMenu
                    disableColumnSelector
                    hideFooterSelectedRowCount
                />
            </Box>
        </>
    )
}
