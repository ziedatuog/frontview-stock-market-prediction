  
import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {AxiosInstance} from '../Axios';
import { useParams } from 'react-router-dom';
import Footer from '../Footer';

const StockData = () => {
    const { companyId } = useParams();
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getStockData = () => {
        AxiosInstance.get(`companies/${companyId}/`)
            .then(res => {
                const stockDataArray = res.data.stock_data; // Extract the stock_data array
                setStockData(stockDataArray);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching stock data:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getStockData();
    }, [companyId]);

    const columns = useMemo(() => [
        { accessorKey: 'date', header: 'Date', size: 150 },
        { accessorKey: 'open', header: 'Open', size: 150 },
        { accessorKey: 'high', header: 'High', size: 150 },
        { accessorKey: 'low', header: 'Low', size: 150 },
        { accessorKey: 'close', header: 'Close', size: 150 },
        { accessorKey: 'volume', header: 'Volume', size: 150 },
    ], []);

    return (
        <div>
            {loading ? (
                <p>Loading stock data...</p>
            ) : (
                <MaterialReactTable 
                    columns={columns} 
                    data={stockData} 
                />
            )}
            <Footer/>
        </div>
    );
};

export default StockData;
