import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/css/tabulator_modern.min.css';
import 'react-tabulator/lib/styles.css';

import MinimalChart from './Chart';
import { useRawData } from './hooks/useRawData';

function App() {
    const { data, isLoading } = useRawData();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!data) {
        return <div>No data available</div>;
    }
    const dataTable = data['bnn_dried_bag'].objects();
    console.log(dataTable);
    const columns = Object.keys(dataTable[0]).map((key) => ({
        title: key,
        field: key,
    }));
    return (
        <>
            <h1>Dashboard</h1>
            <MinimalChart />
            <ReactTabulator
                data={dataTable}
                columns={columns}
                options={{ layout: 'fitColumns' }}
            />
        </>
    );
}

export default App;
