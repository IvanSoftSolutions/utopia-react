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
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';



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
        id: 'id',
        numeric: true,
        disablePadding: false,
        label: 'Id',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'producer',
        numeric: false,
        disablePadding: false,
        label: 'Producer',
    },
    {
        id: 'presentation',
        numeric: false,
        disablePadding: false,
        label: 'Presentation',
    },
    {
        id: 'amount',
        numeric: true,
        disablePadding: false,
        label: 'Amount',
    },
    {
        id: 'weight',
        numeric: true,
        disablePadding: false,
        label: 'Weight',
    },
    {
        id: 'kg',
        numeric: true,
        disablePadding: false,
        label: 'KG',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'total',
        numeric: true,
        disablePadding: false,
        label: 'Total',
    },
    {
        id: 'currency',
        numeric: false,
        disablePadding: false,
        label: 'Currency',
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
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function Engrases() {
    const [rows, setRows] = useState([]);
    // const [open, setOpen] = React.useState(false);
    // const [openNew, setOpenNew] = React.useState(false);
    // const [name, setName] = React.useState('');
    // const [producer, setProducer] = React.useState('');
    // const [presentation, setPresentation] = React.useState('');
    // const [qty, setQty] = React.useState(0);
    // const [weight, setWeight] = React.useState(0);
    // const [price, setPrice] = React.useState(0);
    // const [currency, setCurrency] = React.useState('');

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

    // useEffect((rows) => {
    //     StockService.getStock().then(response => {
    //         if (response.status === 200) {
    //             console.log(response.data);
    //             setRows(response.data);
    //             console.log(rows);
    //         }
    //     });
    // }, [open, openNew])

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    // const handleOpenNew = () => {
    //     setOpenNew(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const handleCloseNew = () => {
    //     setOpenNew(false);
    // };

    // const handleNameChange = (event) => {
    //     setName(event.target.value);
    // };

    // const handleProducerChange = (event) => {
    //     setProducer(event.target.value);
    // };

    // const handlePresentationChange = (event) => {
    //     setPresentation(event.target.value);
    // };

    // const handleQtyChange = (event) => {
    //     setQty(event.target.value);
    // };

    // const handleWeightChange = (event) => {
    //     setWeight(event.target.value);
    // };

    // const handlePriceChange = (event) => {
    //     setPrice(event.target.value);
    // };

    // const handleCurrencyChange = (event) => {
    //     setCurrency(event.target.value);
    // };

    // function addStock() {
    //     let data = {
    //         name: name,
    //         qty: qty
    //     }
    //     StockService.addStock(data).then(response => {
    //         if (response.status === 200) {
    //             console.log(response);
    //             console.log('simon')
    //             setOpen(false);
    //         } else {
    //             console.log('nel')
    //         }
    //     })
    //     let inOutData = {
    //         date: new Date().toLocaleString(),
    //         prodId: 0,
    //         qty: qty,
    //         InOrOut: 'In'
    //     }
    //     // console.log(inOutData);
    //     InOutService.postInOutName(inOutData, name).then(response => {
    //         if (response.data === 200) {
    //             // console.log(response.data)
    //         }
    //     }).catch(function (error) {
    //         if (error.response) {
    //             console.log(error.response.data)
    //         }
    //     })
    // }

    // function newChemical() {
    //     let data = {
    //         pName: name,
    //         producer: producer,
    //         presentation: presentation,
    //         qty: qty,
    //         weight: weight,
    //         price: price,
    //         currency: currency
    //     }
    //     StockService.newChemical(data).then(response => {
    //         if (response.status === 200) {
    //             console.log(response);
    //             console.log('simon')
    //             setOpenNew(false);
    //         } else {
    //             console.log(response);
    //             console.log('nel')
    //         }
    //     })
    // }

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
                                row.id === 1 ? <TableRow></TableRow> : row.id === 2 ? <TableRow></TableRow> :
                                    row.id === 999 ? <TableRow></TableRow> :
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{row.id}</TableCell>
                                            <TableCell>{row.pName}</TableCell>
                                            <TableCell>{row.producer}</TableCell>
                                            <TableCell>{row.presentation}</TableCell>
                                            <TableCell>{row.qty}</TableCell>
                                            <TableCell>{row.weight}</TableCell>
                                            <TableCell>{row.kg}</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.kg * row.price}</TableCell>
                                            <TableCell>{row.currency}</TableCell>
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
        </>
    )
}
