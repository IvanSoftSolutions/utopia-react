import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import LogService from '../services/LogService';

export default function LogReport() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        LogService.getLogs().then(response => {
            if (response.status === 200) {
                // console.log(response.data);
                setRows(response.data);
            }
        });
    }, [])

    const headCells = [
        {
            field: 'uName',
            width: 150,
            headerName: 'User',
        },
        {
            field: 'date',
            width: 100,
            headerName: 'Date',
        },
        {
            field: 'fName',
            width: 200,
            headerName: 'Formula',
        },
        {
            field: 'weight',
            width: 100,
            headerName: 'Weight',
        },
        {
            field: 'thickness',
            width: 100,
            headerName: 'Thickness',
        },
        {
            field: 'material',
            width: 150,
            headerName: 'Material',
        },
        {
            field: 'details',
            width: 600,
            headerName: 'Details',
        },
    ]

    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={headCells} components={{ Toolbar: GridToolbar }} />
        </Box>
    )
}
