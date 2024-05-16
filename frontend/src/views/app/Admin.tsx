import React, { useEffect } from 'react'
import AppLayout from '../../components/layout/AppLayout'
import { getAllSessions, createSession, closeSession } from '../../services/game';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { setSessions, clearOneSession } from '../../store/gameSlice';
import AdminContainer from '../../components/admin/Container';
import { Button } from 'primereact/button';
import { AxiosError } from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import GameSessionImage from '../../assets/yums.jpg';
import { useNavigate } from 'react-router-dom';



const Admin: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const gameSessions = useSelector((state: RootState) => state.game.sessions);

    useEffect(() => {
        loadSessions();
    })

    const loadSessions = async() => {
        try {
            const result = await getAllSessions();
            dispatch(setSessions(result.reverse()));
        } catch (error) {
            console.error('error failed:', error);
        }
    }

    const createNewSession = async() => {
        try {
            const result = await createSession();
            if(result){
                toast.success('Session créée avec succès', { position: "top-center" });
                loadSessions();
            }
        } catch (error) {
            console.error('error failed:', error);
            if(error instanceof AxiosError) {
                toast.error(error?.response?.data?.message, { position: "top-center" });
            }
        }
    }

    const closeASession = async(sessionId: string) => {
       try {
            const result = await closeSession(sessionId);
            if(result){
                dispatch(clearOneSession(sessionId));
                toast.success('Session fermée avec succès', { position: "top-center" });
            }
       } catch (error) {
            console.error('error failed:', error);
            if(error instanceof AxiosError) {
                toast.error(error?.response?.data?.message, { position: "top-center" });
            }
       }
    }

    const goToDetailsPage = (sessionId: string) => {
        navigate(`/result/${sessionId}`)
    }

  return (
    <AppLayout>
        <div className='home-container'>
            <AdminContainer>
                <div className='d-flex w-full justify-content-between align-items-center'>
                    <h3 className='mt-0 mb-0'>Liste des sessions</h3>
                    <Button label="Créer une nouvelle session" onClick={createNewSession} size="small" />
                </div>
                <div className="d-flex flex-row flex-wrap w-full gap-4 mt-5">
                    {(gameSessions && gameSessions.length > 0) && (
                        gameSessions.map((gameSession, index) => (
                           <div className='gameCard' key={index} onClick={() => goToDetailsPage(gameSession._id)}>
                            <img src={GameSessionImage} className='image' alt="gamesession" />
                            <p className='name'>{gameSession.name}</p>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='status'>{ gameSession.status === 'finished' ? 'cloturer' : 'En cours' }</p>
                                {gameSession.status === 'inprogress' && (
                                    <div className='d-flex gap-2' onClick={() => closeASession(gameSession._id)}>
                                        <i className="pi pi-lock"></i>
                                        <p>Fermer</p>
                                    </div>
                                )}
                            </div>
                            
                           </div>
                        ))
                    )}
                </div>
            </AdminContainer>
            <ToastContainer />
        </div>
    </AppLayout>
  )
}


export default Admin