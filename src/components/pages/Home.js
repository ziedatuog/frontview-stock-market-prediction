  
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
// import { Box, IconButton } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {AxiosInstance} from '../Axios'; // Ensure AxiosInstance is correctly configured
import Dayjs from 'dayjs';
import Footer from '../Footer';
// import { Link } from 'react-router-dom';

const Home = () => {
    const [myData, setMyData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data asynchronously
    const fetchData = async () => {
        try {
            const response = await AxiosInstance.get('stockdata/');
            setMyData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData when component mounts
    }, []);

    const columns = useMemo(() => [
        {
            accessorKey: 'company.name', // Access nested data with dot notation
            header: 'Company Name',
            size: 150,
        },
        {
            accessorKey: 'company.ticker',
            header: 'Ticker',
            size: 150,
        },
        {
            accessorFn: (row) => Dayjs(row.date).format('DD-MM-YYYY'), // Format the date properly
            header: 'Date',
            size: 150,
        },
        {
            accessorKey: 'open',
            header: 'Open',
            size: 150,
        },
        {
            accessorKey: 'high',
            header: 'High',
            size: 150,
        },
        {
            accessorKey: 'low',
            header: 'Low',
            size: 150,
        },
        {
            accessorKey: 'close',
            header: 'Close',
            size: 150,
        },
        {
            accessorKey: 'volume',
            header: 'Volume',
            size: 150,
        },
    ], []);

    return (
        <div>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <MaterialReactTable
                    columns={columns}
                    data={myData}
                    enableRowActions
                    // renderRowActions={({row}) => (
                    //     <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                    //         <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                    //             <EditIcon />
                    //         </IconButton>
                    //         <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                    //             <DeleteIcon />
                    //         </IconButton>
                    //     </Box>
                    // )}
                />
            )}
            <Footer />
        </div>
    );
};

export default Home;
