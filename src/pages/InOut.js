import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

import InOutService from '../services/InOutService';

export default function InOut() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        InOutService.getInOuts().then(response => {
            if (response.status === 200) {
                console.log(response.data);
                setRows(response.data);
            }
        });
    }, [])

    const headCells = [
        {
            field: 'date',
            width: 150,
            headerName: 'Date',
        },
        {
            field: 'pName',
            width: 250,
            headerName: 'Name',
        },
        {
            field: 'qty',
            width: 100,
            headerName: 'Quantity',
        },
        {
            field: 'presentation',
            width: 100,
            headerName: 'Presentation',
        },
        {
            field: 'weight',
            width: 100,
            headerName: 'Weight',
        },
        {
            field: 'total',
            width: 100,
            headerName: 'Total',
            valueGetter: getTotal
        },
        {
            field: 'inOrOut',
            width: 100,
            headerName: 'In/Out',
        }
    ]

    function getTotal(params) {
        return (params.row.qty * params.row.weight);
    }

    return (
        <Box sx={{ height: 500, width: '100%' }}>
            <DataGrid rows={rows} columns={headCells} components={{ Toolbar: GridToolbar }} />
        </Box>
    )
}
