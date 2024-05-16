import React, { useEffect } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import AdminContainer from '../../components/admin/Container';
import 'react-toastify/dist/ReactToastify.css';
import {getResult} from '../../services/game';
import { useParams } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';




const GameResult: React.FC = () => {
    const { id } = useParams();
    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        loadResult();
        // eslint-disable-next-line
    }, [])

    const loadResult = async() => {
        try {
            if(id){
                const result = await getResult(id);
                setProducts(result);
            }
        } catch (error) {
            console.error('error failed:', error);
        }
    }

  return (
    <AppLayout>
        <div className='home-container'>
            <AdminContainer>
                <div className='d-flex w-full justify-content-between align-items-center'>
                    <h3 className='mt-0 mb-0'>Résultats</h3>
                </div>
                <br />
                <div className="d-flex w-full">
                    <DataTable value={products} className='w-full' paginator rows={10} rowsPerPageOptions={[10, 25, 50]}>
                        <Column field="player.name" header="Nom"></Column>
                        <Column field="player.email" header="Email"></Column>
                        <Column field="win" header="Gagner"></Column>
                        <Column field="gameReward.name" header="récompense"></Column>
                    </DataTable>
                </div>
            </AdminContainer>
        </div>
    </AppLayout>
  )
}


export default GameResult