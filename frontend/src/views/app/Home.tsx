import React, { useEffect } from 'react'
import GameBoard from '../../components/home/GameBoard'
import {getActiveSession} from '../../services/game'
import AppLayout from '../../components/layout/AppLayout'
import { AppDispatch } from '../../store'
import { useDispatch } from 'react-redux'
import { setSession } from '../../store/gameSlice'

const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    
    useEffect(() => {
        getActiveGame();
        // eslint-disable-next-line
    }, [])

    const getActiveGame = async () => {
        try {
            const result = await getActiveSession();
            console.log('result:', result);
            
            dispatch(setSession(result));
        } catch (error) {
            console.error('error failed:', error);
        }
    }

  return (
    <AppLayout>
         <div className='home-container'>
            <div className="gameBoard d-flex flex-row w-full gap-2">
                <div className="flex-1">
                    <GameBoard />
                </div>
            </div>
        </div>
    </AppLayout>
  )
}

export default Home
