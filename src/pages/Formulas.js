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
// import { DataGrid } from '@mui/x-data-grid';

import FormulasService from '../services/FormulasService';

export default function Formulas() {
    const [article, setArticle] = React.useState('');
    const [color, setColor] = React.useState('');
    const [rows, setRows] = React.useState([]);

    // const columns = [
    //     { field: 'id', headerName: 'ID', width: 70 },
    //     { field: 'firstName', headerName: 'First name', width: 130 },
    //     { field: 'lastName', headerName: 'Last name', width: 130 },
    //     { field: 'pName', headerName: 'pName', width: 70 },
    //     { field: 'temp', headerName: 'temp', width: 130 },
    //     { field: 'dillution', headerName: 'dillution', width: 130 },
    //     { field: 'ph', headerName: 'ph', width: 70 },
    //     { field: 'cut', headerName: 'cut', width: 130 },
    //     { field: 'time', headerName: 'time', width: 130 }
    // ]

    // useEffect((article, color) => {
    //     getFormula(article + '_' + color);
    // }, [])

    // function createData(id, percentage, pName, temp, dillution, time, ph, cut, observations) {
    //     return { id, percentage, pName, temp, dillution, time, ph, cut, observations };
    // }

    function getFormula(f_name) {
        FormulasService.getFormula(f_name).then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
                // response.data.map((r) => {
                //     console.log(r);

                // });
                console.log(rows);
            }
        });
    }

    const handleArticleChange = (event) => {
        setArticle(event.target.value);
    };

    const handleColorChange = (event) => {
        setColor(event.target.value);
    };

    return (
        <>
            <div className="formula-input" style={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                <List>
                    <ListItem disablePadding>
                        <TextField required id="outlined-basic" label="Date" variant="outlined" />
                    </ListItem>
                    <ListItem disablePadding>
                        <FormControl required style={{ width: '58.5%' }}>
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
                        <FormControl required style={{ width: '58.5%' }}>
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
                        <TextField required id="outlined-basic" label="Weight" variant="outlined" />
                    </ListItem>
                    <ListItem disablePadding>
                        <TextField required id="outlined-basic" label="Thickness" variant="outlined" />
                    </ListItem>
                    <ListItem disablePadding>
                        <TextField required id="outlined-basic" label="Material" variant="outlined" />
                    </ListItem>
                </List>
                <Button variant="text" onClick={() => { getFormula(article + '_' + color) }}>OK</Button>
            </div>
            {/* <DataGrid rows={rows} columns={columns} /> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
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
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell>{row.percentage}</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>{row.pName}</TableCell>
                                <TableCell>{row.temp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>

    )
}
