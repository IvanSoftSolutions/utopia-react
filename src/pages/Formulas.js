import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
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
import AlertTitle from '@mui/material/AlertTitle';

import FormulasService from '../services/FormulasService';
import UserServices from '../services/UsuariosService';

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

    let ingredientsTotal = {};

    let userData = {
        uName: user,
        pass: password
    };

    function userAuth(userData) {
        UserServices.login(userData).then(response => {
            if (response.status === 200) {
                let formulaData = {
                    formulaId: 1,
                    userId: response.data.id,
                    date: new Date().toLocaleString(),
                    weight: weight,
                    thickness: thickness,
                    material: material,
                    details: details
                };
                setSuccess(true);
                setError(false);
                postFormula(formulaData);
                console.log(response.data)
            }

        }).catch(function (error) {
            if (error.response) {
                setSuccess(false);
                setError(true);
                console.log(error.response.data)
            }
        })
    }

    function postFormula(data) {
        FormulasService.postLog(data).then(response => {
            if (response.status === 200) {
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
                response.data.map((row) => {
                    if (ingredientsTotal[row.pName]) {
                        ingredientsTotal[row.pName] = ingredientsTotal[row.pName] + ((weight) * (row.percentage)) / 100;
                    } else {
                        ingredientsTotal[row.pName] = ((weight) * (row.percentage)) / 100;
                    }
                })
                console.log(ingredientsTotal);
            }
        });
    }

    // function handleAlert(success, error) {
    //     if (success === true) {
    //         return (
    //             <Alert severity="success">
    //                 <AlertTitle>Success</AlertTitle>
    //                 This is a success alert — <strong>check it out!</strong>
    //             </Alert>
    //         )
    //     } else if (error === true) {
    //         return (
    //             <Alert severity="error">
    //                 <AlertTitle>Error</AlertTitle>
    //                 This is an error alert — <strong>check it out!</strong>
    //             </Alert>
    //         )
    //     } else {
    //         return
    //     }
    // }

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
                                <MenuItem value={'Diva'}>Diva</MenuItem>
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
                                <MenuItem value={'Black'}>Black</MenuItem>
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
                        <TextField id="outlined-basic" label="Details" onChange={handleDetailsChange} variant="outlined" margin='dense' />
                    </ListItem>
                </List>
            </div>
            <div>
                {error ? <Alert severity='error'>Incorrect user or password</Alert> : <></>}
                {success ? <Alert severity='success'>Formula info successfully stored in database</Alert> : <></>}
                <Button variant="text" onClick={() => {
                    getFormula(article + '_' + color)
                }}>Buscar</Button>
                <Button variant='text' onClick={() => {
                    handleClickOpen();
                }} >Aceptar</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        {/* {() => handleAlert(success, error)} */}
                        <DialogContentText>
                            Introduce User and Password for authorization
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="user"
                            label="User"
                            type="email"
                            variant="standard"
                            onChange={handleUserChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            label="Password"
                            type="pasword"
                            variant="standard"
                            onChange={handlePasswordChange}
                        />
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
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>%</TableCell>
                            <TableCell>QTY</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Temp</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>pH</TableCell>
                            <TableCell>#Cut</TableCell>
                            <TableCell>Observations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.percentage}</TableCell>
                                <TableCell>{((weight) * (row.percentage)) / 100}</TableCell>
                                <TableCell>{row.pName}</TableCell>
                                <TableCell>{row.temp}</TableCell>
                                <TableCell>{row.time}</TableCell>
                                <TableCell>{row.ph}</TableCell>
                                <TableCell>{row.cut}</TableCell>
                                <TableCell>{row.observations}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
