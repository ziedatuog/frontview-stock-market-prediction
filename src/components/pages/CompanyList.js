  
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton } from '@mui/material';
// import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import {AxiosInstance} from '../Axios';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getCompanies = () => {
        AxiosInstance.get('companies/')
            .then(res => {
                setCompanies(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getCompanies();
    }, []);

    const columns = useMemo(() => [
        {
            accessorKey: 'name',
            header: 'Company Name',
            size: 150,
        },
        {
            accessorKey: 'ticker',
            header: 'Ticker',
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
                    data={companies} 
                    enableRowActions
                    renderRowActions={({ row }) => (
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                            {/* <IconButton color="secondary" component={Link} to={`/companyEdit/${row.original.id}`}>
                                <EditIcon />
                            </IconButton> */}

                            {/* <IconButton color="error">
                                <DeleteIcon />
                            </IconButton> */}

                            <IconButton color="primary" onClick={() => navigate(`/companies/${row.original.id}/stockdata`)}>
                                View Stock Data
                            </IconButton>
                        </Box>
                    )}
                />
            )}
            <Footer />
        </div>
    );
};

export default CompanyList;
